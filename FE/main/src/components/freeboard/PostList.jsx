    import React, { useState, useEffect } from "react";
    import FreeBoardHeader from "./FreeBoardHeader";
    import { Link } from "react-router-dom";
    import { getPostsPage } from "../../api/axios";
    import { useQuery } from "react-query";
    import PageButton from "./PageButton";
    import { useRecoilState } from "recoil";
    import { activePaginationState } from "../../atoms/ActivePaginationState";
    import DateConversion from "../dateconversion/DateConversion";
    

    //posts로 관리되는 부분을 추후 useRecoilState로 변경 해줘야 생성과 추가가 발생했을 때, 리렌더링이 발생.
    //근데 리렌더링해줄 때, 변화한 부분만 렌더링 시키는 방법 어떻게? 특히 수정의 경우

    function FreeBoard() {
    const [activePage, setActivePage] = useRecoilState(activePaginationState);

    const {
        isLoading,
        isError,
        error,
        data: posts,
        isFetching,
        isPreviousData,
    } = useQuery([`/freeboards?page=${activePage}`, activePage], () => getPostsPage(activePage), {
        keepPreviousData: true,
    });

    if (isLoading) return <p>Loading Users...</p>;

    if (isError) return <p>Error: {error.message}</p>;

    const contents = <PostsLists posts={posts} />;

    const lastPage = () => {
        if (posts.next == true) {
            setActivePage(posts.end + 1);
        console.log("lastPage실행", activePage);
        } else setActivePage(posts.end);
    };

    const firstPage = () => {
        if (posts.prev == true) {
            setActivePage(posts.start - 1);
        console.log("firstPage실행", activePage);
        } else setActivePage(1);
    };

    const pagesArray = Array(posts.end + 1)
        .fill()
        .map((_, index) => index);
    //페이지 네이션의 버튼을 담당.

    const nav = (
        <nav className="flex justify-center pb-2">
        <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
            onClick={firstPage} //disabled={isPreviousData || page === 1}
        >
            &lt;&lt;
        </button>

        {pagesArray.slice(posts.start, posts.end + 1).map((pg) => (
            <PageButton key={pg} pg={pg} setPage={setActivePage} />
        ))}

        
        <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-200"
            onClick={lastPage} //disabled={isPreviousData || page === posts.end}
        >
            &gt;&gt;
        </button>
        </nav>
    );

    

    return (
        <div className="w-full h-full bg-lightbeige pt-4 pb-4">
        {console.log("전송된 데이터 prev, next", posts.prev, posts.next)}
        {console.log("전송된 데이터 start, end", posts.start, posts.end)}
        
        {console.log("현재 ActivePage 값 : ", activePage)}


        <FreeBoardHeader />
        <div className="mx-72 flex flex-col bg-white">
            <div className="w-full h-auto flex flex-col mt-2 ">
            <div className=" py-1 border-b border-gray-200 font-semibold flex">
                <span className="basis-3/4 pl-2 text-center">제목</span>
                <span className="pr-14">글쓴이</span>
                <span className="pr-7">추천수</span>
                <span className="pr-7">날짜</span>
            </div>

            {/*여기가 post뿌려주는 부분*/}
            {contents}
            <div>
                <div className="flex justify-end">
                <div className="mr-3 mt-2 rounded text-white bg-black p-1 cursor-pointer">
                    <Link to="/textedit">글쓰기</Link>
                </div>
                </div>
                <div className="mb-4">{nav}</div>
            </div>
            </div>
        </div>
        </div>
    );
    }

    export default FreeBoard;

    const PostsLists = React.memo(({ posts }) => {
    const [formattedPosts, setFormattedPosts] = useState([]);
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      };

    const date = (regD, modD) => {
        console.log("date함수 실행 redD, modD :", regD, modD);
        const regDate = regD;
        const modDate = modD ? modD : null;

        const displayDate = modDate ? modDate : regDate;
        const displayText = DateConversion(displayDate);

        return displayText;
    };

    useEffect(() => {
        const newFormattedPosts = posts.dtoList.map((post) => ({
        ...post,
        displayDate: date(post.regDate, post.modDate),
        }));
        setFormattedPosts(newFormattedPosts);
    }, [posts]);

    return (
        <div className=" flex flex-col divide-y divide-gray-200">
        {console.log(" PostsLists로 들어온 데이터 :", posts)}
        {console.log(
            " PostsLists로 들어온 데이터 중 posts.dtoList :",
            posts.dtoList
        )}
        {formattedPosts.map((post) => (
            <div key={post.postId} className="w-full h-8">
            {console.log(" PostsLists로 들어온 post.postId", post.postId)}
            {/*<a
            href={post.url}
            className="block p-1 rounded-lg hover:bg-gray-100 bg-black"
        />*/}
            <div className="flex pt-1">
                <div className="basis-3/4 px-2  hover:underline hover:text-blue-500 ">
                <span className="pl-3 text-base text-black mr-1 hover:underline hover:text-blue-500 cursor-pointer">
                    <Link
                    to={`/post/${post.postId}`}
                    
                    >
                    <span>{post.title}</span>
                    </Link>
                </span>
                <span className="text-base text-blue-500">
                    {3}
                </span>
                </div>
                <div className="flex justify-items-stretch">
                <span className="w-28 h-6 min-w-[112px] pr-2 cursor-pointer">
                    {post.writer}
                </span>
                <span className="w-12 h-6 min-w-[48px] text-center text-blue-600  pr-2">
                    {/*post.recommend*/}
                </span>
                <span className="w-20 h-6 min-w-[80px] text-center text-gray-300">
                {post.displayDate}
                </span>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
    });
