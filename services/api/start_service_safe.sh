#!/bin/bash

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
  echo "Port 3000 already in use.  Assuming Commhelper API service already running. Exiting..."
  exit 0
fi

nodemon app.js
