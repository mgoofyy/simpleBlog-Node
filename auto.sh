#!/bin.sh
int=1
while(($int < 5))
do
echo '{"name": "goofyy"}' | http POST http://localhost:3000/login
done
