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
    // createPost({title:'Post Three', body:'This is post three'})
    // .then(function(data){
    //     document.body.innerHTML = `<h1>${data}</h1>`;
    // })

    //We can also return more than 1 promisses and when 
    //we call them we can wait all the functions are completed and then flesh the result
    
    // //Promise.all
    // const promise1 = Promise.resolve('Hello world');
    // const promise2 = 10;
    // const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye')
    // );
    // //const promise4 = fetch('https://jsonplaceholder.typicode.com/users')  // need to convert it to json to get the actual reult format
    // const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

    // Promise.all([promise1, promise2, promise3,promise4]).then(values => console.log(values));

    //Async / Await

    async function init(){
        var ss = await createPost({title:'Post Four', body:'This is post four'});
        alert(ss)
        getPosts();
    }
    init();

    //call fetch using async/await

    async function fetchUsers()
    {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        console.log(data);
    }
    fetchUsers();