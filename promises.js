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
            document.body.innerHTML = `<h1>${error}</h1>`; 
        })
    // createPost({title:'Post Three', body:'This is post three'})
    // .then(function(data){
    //     document.body.innerHTML = `<h1>${data}</h1>`;
    // })