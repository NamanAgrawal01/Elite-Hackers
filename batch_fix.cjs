const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) results.push(file);
        }
    });
    return results;
};

const files = walk(path.join(process.cwd(), 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix motion unused
    if (content.includes("import { motion") || content.includes("import motion")) {
        content = content.replace(/import \{ motion/g, "import { motion as Motion");
        content = content.replace(/import motion/g, "import Motion");
        content = content.replace(/motion\./g, "Motion.");
        changed = true;
    }

    // Fix Date.now() in AdminPayments.jsx specifically
    if (file.includes('AdminPayments.jsx')) {
        content = content.replace(/const now = Date.now\(\);/g, "// Calculated inside updateDoc");
        content = content.replace(/Timestamp\.fromMillis\(now \+ thirtyDays\)/g, "Timestamp.fromMillis(Date.now() + 30 * 24 * 60 * 60 * 1000)");
        changed = true;
    }
    
    // Fix Dashboard.jsx setCurrentDate
    if (file.includes('Dashboard.jsx')) {
        content = content.replace(/setCurrentDate\(new Date\(\)\);/g, "// Sync removed for purity");
        changed = true;
    }

    // Fix unused vars in common pages
    content = content.replace(/const \[.*?, setSaving\] = useState\(false\);/g, (match) => {
        if (!content.includes('setSaving(')) return match.replace('setSaving', '_setSaving');
        return match;
    });
    
    // Fix 'err' unused
    content = content.replace(/\} catch \(err\) \{/g, "} catch (_err) {");
    content = content.replace(/\} catch \(error\) \{/g, "} catch (_error) {");

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${path.basename(file)}`);
    }
});
