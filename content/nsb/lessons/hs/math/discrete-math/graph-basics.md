---
id: nsb-lesson-0747
title: "Graphs, Vertices, and Edges"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: graph-basics
type: "Application"
estimatedMinutes: 15
keyConcepts: ["vertices", "edges", "paths", "connectivity"]
summary: "Graphs model networks: social networks, transportation, computer networks, molecules."
---
#### Graph Definition and Terminology
A graph G = (V, E) consists of vertices (nodes) V and edges E (pairs of vertices). A directed graph has edges with direction (arrows). An undirected graph has edges without direction (lines). A weighted graph assigns a number (weight) to each edge. Degree of a vertex is the number of edges connected to it. In directed graphs, in-degree and out-degree distinguish incoming and outgoing edges. Example: a social network has people as vertices and friendships as edges (undirected). A web graph has pages as vertices and hyperlinks as directed edges.

#### Paths and Cycles
A path is a sequence of vertices where consecutive pairs are connected by edges. A simple path repeats no vertices. A cycle is a path that starts and ends at the same vertex. In an undirected graph, a graph is connected if there's a path between any two vertices. In a directed graph, a graph is strongly connected if there's a directed path from every vertex to every other vertex. Example: cities are vertices, roads are edges; a path represents traveling from city A to city B via intermediate cities.

#### Special Graphs
A complete graph K_n has all possible edges: n vertices and n(n−1)/2 edges. A bipartite graph has vertices split into two sets with edges only between sets, never within. The complete bipartite graph K_{m,n} has m vertices in one set, n in the other, with all possible edges between sets. A tree is a connected acyclic graph (no cycles); it has n vertices and n−1 edges. Example: an organizational chart is a tree (each employee has a unique manager). A forest is a disjoint union of trees.

#### Graph Representations
Adjacency matrix: an n × n matrix where entry (i, j) is 1 if there's an edge from i to j, 0 otherwise. Adjacency list: a list for each vertex containing its neighbors. The matrix is dense (uses O(n²) space) but fast for lookup. The list is sparse (uses O(n+e) space, where e is edges) and efficient for traversal.

#### Review Questions
1. How many edges does a complete graph K_5 have?
2. Is the graph with vertices {A, B, C, D} and edges {AB, BC, CD} connected? Is it a tree?
3. Draw the complete bipartite graph K_{2,3}.

---
