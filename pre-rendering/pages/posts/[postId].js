import {useRouter} from 'next/router'

function Post({post}){

    const router = useRouter()
    if(router.isFallback){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )

}

export default Post


export async function getStaticPaths(){
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    // const data = await response.json()
    // //fetch the posts to get the array of posts adn specify dynamically the possible values instead of hard coding it
    // const paths = data.map(post => {
    //     return {
    //         params :{
    //             postId : `${post.id}`
    //             //we need to specify that what is the posible value for the route for postId
    //         }
    //     }
    // })
    return {
        paths: [
            {
                params: {postId: '1'}
            },
            {
                params: {postId: '2'}
            },
            {
                params: {postId: '3'}
            }
        ],
        // paths, 
        fallback:true
    }

}

export async function getStaticProps(context){
    const {params} = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()
    if(!data.id){
        return {
            notFound: true
        }
    }
    console.log(`Generating page for /posts/${params.postId}`)

    return {props: {post: data}}
}



/*
FALLBACK CONCEPTS
the paths that are returned from the getstaticpath will be rendered to html at the build time by getstaticprops


for false---------------

If fallback is false, then any paths not returned by the getstaticpaths will result in 404 page
when to use it
when we have a small no of paths and new pages are not added often
a blog site with a few articles is a good ex for fallaback set to false


for true-----------------
the paths that have not been generated at build time will not result in a 404 page, rather next.js will serve a "fallback" version of the page on the first request of such a path
in bg, next.js will statically generate the requested path's HTML nd JSON and this includes running getstaticprops
when that's done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user's perspective the fallback page is swapped to the full rendered page
now once the next.js renders such a page it keeps track of it and renders the same page on further requests
when to use
when you ahve a very large number of static pages that depends on data like a large e commerce site
wnat all the product pages to be pre-rendered but if we have a few thousands products, builds can take a really long time
so statically generate a small subset of products that are popular and use fallback:true for the rest
when someone requests a page that's not generated yet, the user will see a loading indicator
when getstaticprops finishes the rendered page will be displayed and from there on the pre-rendered page will be displayed
this ensures fast experience


for blocking----------
the only difference in true and blocking is that in the blocking the fallback page is not shown and the time is a bit delayed.
when to use
on ux level, sometimes, people prefer the page to be loaded without a laoding indicator if the wait time is a few mili seconds.this helps in avoiding the layout shift
main issue was that some crawlers didn't support javascript and the loading apge would be rendered and then the full page would be loaded which was causing a problem

*/