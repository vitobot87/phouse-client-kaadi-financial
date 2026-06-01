import { mkdirSync, copyFileSync, readdirSync, cpSync } from 'node:fs';
mkdirSync('dist/assets',{recursive:true});
copyFileSync('index.html','dist/index.html');
copyFileSync('_worker.js','dist/_worker.js');
cpSync('assets','dist/assets',{recursive:true});
