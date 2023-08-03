import styled  from 'styled-components'
import React, { useState } from 'react'
import PostModal from "./PostModal"
import { connect } from 'react-redux';
import { getArticlesAPI } from '../action';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
const Main = (propes) => {
    console.log("why");
    propes.articles.map((artcle,key)=>(
        console.log("hii")
    ))
    console.log(propes.articles);
    const [showModal,setShowModal]=useState("close");
    useEffect(()=>{
        propes.getArticles();
    },[])
    const handleClick=(e)=>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        switch(showModal){
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    }
    function likeHandler(event, postIndex, id) {
		event.preventDefault();
		let currentLikes = propes.articles[postIndex].likes.count;
		let whoLiked = propes.articles[postIndex].likes.whoLiked;
		let user = propes.user.email;
		let userIndex = whoLiked.indexOf(user);

		if (userIndex >= 0) {
			currentLikes--;
			whoLiked.splice(userIndex, 1);
		} else if (userIndex === -1) {
			currentLikes++;
			whoLiked.push(user);
		}

		const payload = {
			update: {
				likes: {
					count: currentLikes,
					whoLiked: whoLiked,
				},
			},
			id: id,
		};

		propes.likeHandler(payload);
	}
  return (
    <>
    {
        propes.articles.length === 0 ?(
        <p>There are no articles</p>)
         :(
    <Container><ShareBox>
    <div>
    { propes.user && propes.user.photoURL ? (
    <img src={propes.user.photoURL} alt="heyy"  /> )
    :(
    <img src="/images/user.svg" alt="akak" />
    )}
        <button onClick={handleClick} disabled={propes.loading ? true : false}>Start a post</button>
    </div>
    <div>
        <button>
            <img src="/images/photo.svg" alt="photo_svg" />
            <span>Photo</span>
        </button>
        <button>
            <img src="/images/video.svg" alt="" />
            <span>Video</span>
        </button>
        <button>
            <img src="/images/event.svg" alt="" />
            <span>Event</span>
        </button>
        <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write Article</span>
        </button>
    </div>
    </ShareBox>
    <Content>
        {
            propes.loading && <img src="/images/spin-loader.gif" alt="Loading-img" />
        }
        {propes.articles.length>0 && 
        propes.articles.map((artcle,key)=>(
        <Article key={key}>
            <SharedActor>
                <a>
                    <img src={artcle.actor.image} alt="" />
                    <div>
                        <span>{artcle.actor.title}</span>
                        <span>{artcle.actor.description}</span>
                        <span>{artcle.actor.date.toDate().toLocaleDateString()}</span>
                    </div>
                </a>
                <button>
                    <img src="/images/ellipsi.svg" alt="" />
                </button>
            </SharedActor>
            <Description>{artcle.description}</Description>
            <SharedImg>
                <a >
                {
                    !artcle.sharedImg && artcle.video ? <ReactPlayer width={'100'} url={artcle.video}/>
                : 
                (artcle.sharedImg && <img src={artcle.sharedImg}/>)
                }
                </a>
            </SharedImg>
            <SocialCount>
                <li>
                    <button>
                        <img src="https://www.userflow.nl/images/Linkedin-Like-Icon-Thumbup250.png" alt="Likes" />
                        {/* <img src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands500.png" alt="clapping" /> */}
                        <img src="https://www.userflow.nl/images/Linkedin-Celebrate-Icon-ClappingHands250.png" alt="" />
                        <span className='count'>{propes.articles[6].likes.count}</span>
                        <a className='count'>{artcle.comments}</a>
                    </button>
                </li>
                <li>
                    <li>
                        
                    </li>
                </li>
            </SocialCount>
            <SocialAction>

            <button>
                <img src="/images/like-icon.svg" alt="Like_Icon" />
                <span>Like</span>
            </button>
            <button>
                <img src="/images/comment-icon.svg" alt="" />
                <span>Comments</span>
            </button>
            <button>
                <img src="/images/share-icon.svg" alt="" />
                <span>Share</span>
            </button>
            <button>
                <img src="/images/send-icon.svg" alt="" />
                <span>Send</span>
            </button>
            </SocialAction>
            
        </Article>
         ))}
    </Content>
    <PostModal showModal={showModal} handleClick={handleClick}/>
    </Container>
    )}
    </>
  )
}
const Container=styled.div`
    grid-area: main;
`;
const CommonCard=styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0/20%);

`;
const ShareBox=styled(CommonCard)
`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;
    div{
        button{
            outline: none;
            color: rgba(0,0,0,0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child{
            display: flex;
            align-items:center;
            padding: 8px 16px 0px 16px;
            img{
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
            button{
                img{
                    margin: 0 4px 0 -2px;
                    width: 25px;
                }
                span{
                    color:#70b5f9
                }
            }
        }
    }
`;
const Article=styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;
const SharedActor=styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a{
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        img{
            width: 48px;
            height: 48px;
        }
        &>div{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow:hidden ;
            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }

        }
    }
    button{
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        margin-top: 2%;
    }
`;
const Description=styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;

`;
const SharedImg=styled.div`
    margin-top:8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;
const SocialCount=styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    background: transparent;
    li{
        margin-right: 5px;
        font-size: 12px;
        /* background: transparent; */
        button{
            display: flex;
            background-color: #f7f7f7;
            border: none;
            img{
                display: flex;
                width: 20px;
                padding: 0 5px;
            }
            span{
                margin-top: 1px;
                margin-left: 5px;
                font-weight: 500;
                font-size: 20px;
            }
            a{
                margin-top: 1px;
                margin-left: 5px;
                font-weight: 500;
                font-size: 20px;
            }
            
        }
    }
`;
const SocialAction=styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        background-color: white;
        @media(min-width: 768){
            span{
                margin-left: 8px;
            }
        }
    }
    
`;
const Content=styled.div`
    text-align: center;
    & > img {
        width: 30px;;
    }
`;
const mapStateToProps=(state)=>{
    return {
        loading:state.articleState.loader,
        user:state.userState.user,
        articles:state.articleState.articles,
    };
}
const mapDispatchToProps=(dispatch) =>({
    getArticles:()=> dispatch(getArticlesAPI()),
})
export default connect(mapStateToProps,mapDispatchToProps)(Main);