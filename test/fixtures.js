const fixtures = [
	{
		title: 'single line codeblock',
		input: `
\`\`\`sh
docker ps -a
\`\`\`
`,
output: `<div class="highlight highlight-shell"><div class="highlight-header"><div class="highlight-language">sh</div></div><pre><code tabindex="0"><span class="line line-standalone">docker ps -a</span></code></pre></div>
`
	},
	{
		title: 'line numbers for multiline codeblock',
		input: `
\`\`\`css
* {
	display: revert;
}
\`\`\`
`,
output: `<div class="highlight highlight-css"><div class="highlight-header"><div class="highlight-language">css</div></div><pre><code tabindex="0"><span class="line"><span class="line-number" aria-hidden="true">1</span><span class="pl-ent">*</span> {</span>
<span class="line"><span class="line-number" aria-hidden="true">2</span>	<span class="pl-c1">display</span>: <span class="pl-c1">revert</span>;</span>
<span class="line"><span class="line-number" aria-hidden="true">3</span>}</span></code></pre></div>
`
	},
	{
		title: 'prompts',
		input: `
\`\`\`sh prompt{1,3}
curl localhost:8080/actuator/health
{"status":"UP"}
curl localhost:8080/greeter?name=Anya
Hello, Anya!
\`\`\`
`,
output: `<div class="highlight highlight-shell"><div class="highlight-header"><div class="highlight-language">sh</div></div><pre><code tabindex="0"><span class="line"><span class="line-number" aria-hidden="true">1</span><span class="line-prompt" aria-hidden="true">$</span>curl localhost:8080/actuator/health</span>
<span class="line"><span class="line-number" aria-hidden="true">2</span>{<span class="pl-s"><span class="pl-pds">"</span>status<span class="pl-pds">"</span></span>:<span class="pl-s"><span class="pl-pds">"</span>UP<span class="pl-pds">"</span></span>}</span>
<span class="line"><span class="line-number" aria-hidden="true">3</span><span class="line-prompt" aria-hidden="true">$</span>curl localhost:8080/greeter<span class="pl-k">?</span>name=Anya</span>
<span class="line"><span class="line-number" aria-hidden="true">4</span>Hello, Anya<span class="pl-k">!</span></span></code></pre></div>
`
	},
	{
		title: 'highlight lines',
		input: `
\`\`\`sh {4-7} prompt{1}
aws --endpoint-url http://localhost:4566 s3api list-buckets
{
	"Buckets": [
		{
			"Name": "my-bucket",
			"CreationDate": "2022-07-12T13:44:44+00:00"
		}
	],
	"Owner": {
		"DisplayName": "webfile",
		"ID": "bcaf1ffd86f41161ca5fb16fd081034f"
	}
}
\`\`\`
`,
output: `<div class="highlight highlight-shell"><div class="highlight-header"><div class="highlight-language">sh</div></div><pre><code tabindex="0"><span class="line"><span class="line-number" aria-hidden="true"> 1</span><span class="line-prompt" aria-hidden="true">$</span>aws --endpoint-url http://localhost:4566 s3api list-buckets</span>
<span class="line"><span class="line-number" aria-hidden="true"> 2</span>{</span>
<span class="line"><span class="line-number" aria-hidden="true"> 3</span>	<span class="pl-s"><span class="pl-pds">"</span>Buckets<span class="pl-pds">"</span></span>: [</span>
<span class="line line-highlighted"><span class="line-number" aria-hidden="true"> 4</span>		{</span>
<span class="line line-highlighted"><span class="line-number" aria-hidden="true"> 5</span>			<span class="pl-s"><span class="pl-pds">"</span>Name<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>my-bucket<span class="pl-pds">"</span></span>,</span>
<span class="line line-highlighted"><span class="line-number" aria-hidden="true"> 6</span>			<span class="pl-s"><span class="pl-pds">"</span>CreationDate<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>2022-07-12T13:44:44+00:00<span class="pl-pds">"</span></span></span>
<span class="line line-highlighted"><span class="line-number" aria-hidden="true"> 7</span>		}</span>
<span class="line"><span class="line-number" aria-hidden="true"> 8</span>	],</span>
<span class="line"><span class="line-number" aria-hidden="true"> 9</span>	<span class="pl-s"><span class="pl-pds">"</span>Owner<span class="pl-pds">"</span></span>: {</span>
<span class="line"><span class="line-number" aria-hidden="true">10</span>		<span class="pl-s"><span class="pl-pds">"</span>DisplayName<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>webfile<span class="pl-pds">"</span></span>,</span>
<span class="line"><span class="line-number" aria-hidden="true">11</span>		<span class="pl-s"><span class="pl-pds">"</span>ID<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>bcaf1ffd86f41161ca5fb16fd081034f<span class="pl-pds">"</span></span></span>
<span class="line"><span class="line-number" aria-hidden="true">12</span>	}</span>
<span class="line"><span class="line-number" aria-hidden="true">13</span>}</span></code></pre></div>
`
	},
	{
		title: 'add a caption to a codeblock',
		input: `
\`\`\`sh caption='Configuring the AWS account' prompt{1}
aws configure
AWS Access Key ID [None]: gwen
AWS Secret Access Key [None]: stacy
Default region name [None]: us-east-1
Default output format [None]: json
\`\`\`
`,
output: `<div class="highlight highlight-shell"><div class="highlight-header"><div class="highlight-language">sh</div><div class="highlight-caption">Configuring the AWS account</div></div><pre><code tabindex="0"><span class="line"><span class="line-number" aria-hidden="true">1</span><span class="line-prompt" aria-hidden="true">$</span>aws configure</span>
<span class="line"><span class="line-number" aria-hidden="true">2</span>AWS Access Key ID [None]: gwen</span>
<span class="line"><span class="line-number" aria-hidden="true">3</span>AWS Secret Access Key [None]: stacy</span>
<span class="line"><span class="line-number" aria-hidden="true">4</span>Default region name [None]: us-east-1</span>
<span class="line"><span class="line-number" aria-hidden="true">5</span>Default output format [None]: json</span></code></pre></div>
`
	},
	{
		title: 'configure aliases',
		input: `
\`\`\`conf
server {
	listen 4200;
	
	gzip on;
	
	root /usr/share/nginx/html;
	
	location / {
		index index.html index.htm;
		try_files $uri $uri/ /index.html =404;
	}
}
\`\`\`
`,
output: `<div class="highlight highlight-ini"><div class="highlight-header"><div class="highlight-language">conf</div></div><pre><code tabindex="0"><span class="line"><span class="line-number" aria-hidden="true"> 1</span>server {</span>
<span class="line"><span class="line-number" aria-hidden="true"> 2</span>	listen 4200<span class="pl-c">;</span></span>
<span class="line"><span class="line-number" aria-hidden="true"> 3</span>	</span>
<span class="line"><span class="line-number" aria-hidden="true"> 4</span>	gzip on<span class="pl-c">;</span></span>
<span class="line"><span class="line-number" aria-hidden="true"> 5</span>	</span>
<span class="line"><span class="line-number" aria-hidden="true"> 6</span>	root /usr/share/nginx/html<span class="pl-c">;</span></span>
<span class="line"><span class="line-number" aria-hidden="true"> 7</span>	</span>
<span class="line"><span class="line-number" aria-hidden="true"> 8</span>	location / {</span>
<span class="line"><span class="line-number" aria-hidden="true"> 9</span>		index index.html index.htm<span class="pl-c">;</span></span>
<span class="line"><span class="line-number" aria-hidden="true">10</span>		try_files $uri $uri/ /<span class="pl-k">index.html</span> =404<span class="pl-c">;</span></span>
<span class="line"><span class="line-number" aria-hidden="true">11</span>	}</span>
<span class="line"><span class="line-number" aria-hidden="true">12</span>}</span></code></pre></div>
`
	}
]

export default fixtures
