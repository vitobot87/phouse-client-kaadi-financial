import { mkdirSync, copyFileSync, cpSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
mkdirSync('dist/assets',{recursive:true});
execFileSync('npx',['-p','tailwindcss@3.4.17','-p','@tailwindcss/forms','tailwindcss','-i','input.css','-o','dist/styles.css','--minify'],{stdio:'inherit'});
copyFileSync('index.html','dist/index.html');
copyFileSync('_worker.js','dist/_worker.js');
copyFileSync('main.js','dist/main.js');
cpSync('assets','dist/assets',{recursive:true});
