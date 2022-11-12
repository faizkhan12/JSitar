#!/usr/bin/env node
import{program as m}from"commander";import{serveCommand as r}from"./commands/serve";m.addCommand(r),m.parse(process.argv);
