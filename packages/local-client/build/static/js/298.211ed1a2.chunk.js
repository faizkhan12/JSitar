(this["webpackJsonplocal-client"]=this["webpackJsonplocal-client"]||[]).push([[298],{467:function(e,n){!function(e){var n=/\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/.source,t=/(?:\w+(?:<braces>)?|<braces>)/.source.replace(/<braces>/g,(function(){return n})),i=e.languages.pascaligo={comment:/\(\*[\s\S]+?\*\)|\/\/.*/,string:{pattern:/(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1|\^[a-z]/i,greedy:!0},"class-name":[{pattern:RegExp(/(\btype\s+\w+\s+is\s+)<type>/.source.replace(/<type>/g,(function(){return t})),"i"),lookbehind:!0,inside:null},{pattern:RegExp(/<type>(?=\s+is\b)/.source.replace(/<type>/g,(function(){return t})),"i"),inside:null},{pattern:RegExp(/(:\s*)<type>/.source.replace(/<type>/g,(function(){return t}))),lookbehind:!0,inside:null}],keyword:{pattern:/(^|[^&])\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|of|remove|return|skip|then|type|var|while|with)\b/i,lookbehind:!0},boolean:{pattern:/(^|[^&])\b(?:True|False)\b/i,lookbehind:!0},builtin:{pattern:/(^|[^&])\b(?:bool|int|list|map|nat|record|string|unit)\b/i,lookbehind:!0},function:/\w+(?=\s*\()/i,number:[/%[01]+|&[0-7]+|\$[a-f\d]+/i,/\b\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:mtz|n)?/i],operator:/->|=\/=|\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=|]|\b(?:and|mod|or)\b/,punctuation:/\(\.|\.\)|[()\[\]:;,.{}]/},o=["comment","keyword","builtin","operator","punctuation"].reduce((function(e,n){return e[n]=i[n],e}),{});i["class-name"].forEach((function(e){e.inside=o}))}(Prism)}}]);
//# sourceMappingURL=298.211ed1a2.chunk.js.map