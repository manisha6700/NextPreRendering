function ArticleListByCategory({articles,category}) {
    return (<>
    <h1>List of News for {category}</h1>
        {
            articles.map(article =>{
                return (
                    <div key={article.id}>
                        <h2>
                            {article.id} {article.title} | {article.category}
                        </h2>
                        <hr/>
                    </div>
                )
            })
        }
    </> )
}

export default ArticleListByCategory


export async function getServerSideProps(context){
    const {params, req, res, query} = context
    console.log(req.headers.cookie)
    console.log(query)

    res.setHeader('Set-Cookie', ['name=Manisha'])
    const {category} = params
    const response = await fetch(`http://localhost:4000/news?category=${category}`)
    const data = await response.json()
    console.log(`Pre-rendering News Articles for catefory ${category}`)

    return{
        props:{
            articles:data,
            category
        },
    }
}