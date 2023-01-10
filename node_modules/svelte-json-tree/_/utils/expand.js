export function getShouldExpandNode({ defaultExpandedPaths, defaultExpandedLevel, }) {
    const defaultExpandedPathsParts = defaultExpandedPaths.map(path => path.split('.'));
    function matchPath(keyPath) {
        outer: for (const parts of defaultExpandedPathsParts) {
            if (keyPath.length > parts.length)
                continue;
            const length = Math.min(keyPath.length, parts.length);
            for (let i = 0; i < length; i++) {
                if (parts[i] !== '*' && parts[i] !== String(keyPath[i]))
                    continue outer;
            }
            return true;
        }
        return false;
    }
    return function ({ keyPath, level }) {
        return level <= defaultExpandedLevel || matchPath(keyPath);
    };
}
