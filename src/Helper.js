let selectedUser = "";
let selectedFriend = "";
const localStorageUsers = localStorage.getItem("users");
export const users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
const localStorageUserGraph = localStorage.getItem("userGraph");
var graphMap = new Map();
if (localStorageUserGraph) {
    const obj = JSON.parse(localStorageUserGraph);
    graphMap = new Map(Object.entries(obj));
}

export function addNode(node) {
    graphMap.set(node, []);
}


export function addEdge(origin, destination) {


    graphMap.get(origin) || graphMap.set(origin, []);
    graphMap.get(destination) || graphMap.set(destination, [])


    if (graphMap.get(origin).includes(destination)) {
        return "Friend already added.";
    }
    graphMap.get(origin).push(destination);
    graphMap.get(destination).push(origin);

    localStorage.setItem(
        "userGraph",
        JSON.stringify(Object.fromEntries(graphMap))
    );
    return "";
}

export function findPaths(source, destination) {
    let paths = [];
    let path = [];
    let bfsQueue = [];

    path.push(source); // path always begins with the source
    bfsQueue.push(path);

    while (bfsQueue.length > 0) {
        path = bfsQueue.shift();
        const last = path[path.length - 1];

        // If destination node is reached or found
        // then print the path
        if (last === destination) {
            paths.push(path);
        }

        const adjacentNodes = graphMap.get(last);

        for (let i = 0; i < adjacentNodes.length; i++) {
            if (!path.includes(adjacentNodes[i])) {
                // avoid infinite loop: do not visit already visited node
                const newPartialPath = [...path]; // new partial path found that might potentially lead to the destination
                newPartialPath.push(adjacentNodes[i]);
                bfsQueue.push(newPartialPath);
            }
        }
    }
    return paths;
}