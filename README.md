# AsyncJavascript
<h2>CallBack</h2>
in the following example
<pre>
    const posts = [
    {title: "Post One", body:"This is post one"},
    {title:"Post Two", body:"This is post two"}
    ];

    function getPosts(){
        setTimeout(() =&gt; {
            let output='';
            posts.forEach((post, index)=&gt; {
                output += `&lt;li&gt;${post.title}&lt;/li&gt;`;
            });
            document.body.innerHTML = output;
        },1000);
    }

    createPost = (post) =&gt; {
        setTimeout(()=&gt;{
            posts.push(post);
        }, 2000);
    }

    getPosts();
    createPost({title:"Post Three", body:"This is post three"});
</pre>

Since create post take long tim ethan the getPost so the newly creted post is not pasted on the screen meaning before new post get created the getPost past all the available posts in the screen. This is the place we can use call function.

<pre>
    const posts = [
    {title: "Post One", body:"This is post one"},
    {title:"Post Two", body:"This is post two"}
    ];

    function getPosts(){
        setTimeout(() =&gt; {
            let output='';
            posts.forEach((post, index)=&gt; {
                output += `&lt;li&gt;${post.title}&lt;/li&gt;`;
            });
            document.body.innerHTML = output;
        },1000);
    }

    createPost = (post, callback) =&gt; {
        setTimeout(()=&gt;{
            posts.push(post);
            callback();
        }, 2000);
    }

    //getPosts();  // We send this getPosts() as call back to createPost function
    createPost({title:"Post Three", body:"This is post three"}, getPosts);

</pre>

Here we introduced a call back parameter to createPost method and once we create the post call the getPosts method from the body of createPost. Now we wait until the post get created and call getPosts so that we over come the time taken to create and call the getPosts method.

<h2>Promises</h2>

Promises almost same as callback but insead of calling a function as call back we return a promise that tell the calling module success or failure.
<pre>
const posts = [
    {title: "Post One", body:"This is post one"},
    {title:"Post Two", body:"This is post two"}
    ];
    
    function getPosts(){
        setTimeout(() => {
            let output='';
            posts.forEach((post, index)=> {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;
        },1000);
    }
    
    createPost = (post) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                posts.push(post);
                const error = true;

                if(!error){
                    //resolve("Success");
                    resolve();
                }else{
                    reject('Error: Something went wrong');
                }
            }, 2000);
        })
    }
    
    createPost({title:'Post Three', body:'This is post three'})
        .then(getPosts)
        .catch(function(error){
            document.body.innerHTML = `&lt;h2&gt;{error}&lt;/h2&gt;`; 
        })
    // createPost({title:'Post Three', body:'This is post three'})
    // .then(function(data){
    //     document.body.innerHTML = `${data}`;
    // })
</pre>

We can also use multiple promises and wait for all of them is done before handling the result.
<pre>
        //Promise.all
        const promise1 = Promise.resolve('Hello world');
        const promise2 = 10;
        const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye')
        );
        //const promise4 = fetch('https://jsonplaceholder.typicode.com/users')  // need to convert it to json to get the actual reult format
        const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

        Promise.all([promise1, promise2, promise3,promise4]).then(values => console.log(values));
</pre>

We can also use asyn/await  pattern to call a promises and get the return value into a variable

<pre>
const posts = [
    {title: "Post One", body:"This is post one"},
    {title:"Post Two", body:"This is post two"}
    ];
    
    function getPosts(){
        setTimeout(() => {
            let output='';
            posts.forEach((post, index)=> {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;
        },1000);
    }
    
    createPost = (post) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                posts.push(post);
                const error = false;

                if(!error){
                    resolve("Success");
                    //resolve();
                }else{
                    reject('Error: Something went wrong');
                }
            }, 2000);
        })
    }
    
    createPost({title:'Post Three', body:'This is post three'})
        .then(getPosts)
        .catch(function(error){
            document.body.innerHTML = `<h1>${error}</h1>`; 
        })
    
    //Async / Await

    async function init(){
        var ss = await createPost({title:'Post Four', body:'This is post four'});
        alert(ss)
        getPosts();
    }
    init();
</pre>

getting the data from a api call using fetch and async/await

<pre>
    async function fetchUsers()
    {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        console.log(data);
    }
    fetchUsers();
</pre>