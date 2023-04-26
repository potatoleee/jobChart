#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'
//部署至main
# if you are deploying to https://potatoleee.github.io
# git push -f git@github.com:potatoleee/potatoleee.github.io.git main
//部署至gh-pages 先選這個
# if you are deploying to https://potatoleee.github.io/<REPO>
git push -f git@github.com:potatoleee/jobChart.git main:gh-pages

cd -