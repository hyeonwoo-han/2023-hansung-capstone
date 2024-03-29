import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaRegBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedNavigationIndex } from "../../atoms/SelectedNavigationIndex";
import { useState } from "react";
import ProfileModal from "../profilemodal/ProfileModal";
import { AiOutlineCamera } from "react-icons/ai";
import UserDefaultImage from "./../../imgs/userImg/UserDefaultImage.png";
import StudyModal from "../studymodal/StudyModal";
import StudyJoin from "./StudyJoin";
import NotiDropDown from "../nortificationdropdown/NotiDropDown";
import { isAuthenticatedAtom } from "../../atoms/IsAuthenticatedAtom";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  image: UserDefaultImage,
};
const navigation = [
  { name: "Dashboard", href: "dashBoard" },
  { name: "Board", href: "freeBoard" },
  { name: "Calendar", href: "calendar", current: false },
];

const nonAuthenticated = [{ name: "Sign In", href: "dashBoard" }];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    selectedNavigationIndex
  );
  const [open, setOpen] = useState(false);
  const [studyopen, setstudyOpen] = useState(false);
  const [image, setImage] = useState(null);

  const [commentText, setCommentText] = useState("");
  const [commentTextLength, setCommentTextLength] = useState(0);
  
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);

  const navigate = useNavigate();

  const [openNoti, setOpenNoti] = useState(false);

  const handleCommentTextChange = (e) => {
    const newText = e.target.value;
    setCommentText(newText);
    setCommentTextLength(newText.length);
  };

  const onClickLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("mid");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setImage(reader.result); // 파일을 읽은 후, 이미지 상태를 업데이트
      };
      reader.readAsDataURL(file); // 파일을 읽기
    }
  }

  const CameraIcon = ({ handleImageUpload }) => (
    <AiOutlineCamera
      className="w-8 h-8 rounded-full ml-48 -mt-20 border-4 border-gray-300 bg-gray-300 cursor-pointer"
      onClick={handleImageUpload}
    />
  );

  const handleLabelClick = (event) => {
    // Prevent the default label click behavior
    event.preventDefault();
  };

  if (!isAuthenticated) {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-100">
          <body class="h-full">
          ```
        */}
        <div className="w-full h-full sticky z-10 top-0 bg-white">
          <Disclosure as="nav" className="">
            {({ open }) => (
              <>
                <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/" onClick={() => setSelectedIndex(null)}>
                          <img
                            className="object-cover h-8 w-8 cursor-pointer"
                            src="../../imgs/icon1.png"
                            alt=""
                          />
                        </Link>
                      </div>
                      <Navigation navigation={navigation} />
                    </div>
                    <div className="hidden md:block">
                      <div className=" flex items-center md:ml-6">
                        <div className="mr-3 px-3 py-2  rounded-md text-black text-sm font-medium">
                          <button
                            className=" text-black hover:bg-teal-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            
                          >
                            <Link to="/login">
                              {/*여기에도 이거도 걍 Navigation 컴포넌트 주고  추가 필요.*/}
                              Study
                            </Link>
                          </button>
                        </div>

                        <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500 mr-10">
                          {/*여기에 search 함수 연결*/}
                          <input
                            type="text"
                            className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                            placeholder="Search"
                          />
                          <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
                            <svg
                              className="w-4 h-4 fill-current"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        {/*nav Bell 아이콘 있던 자리*/}
                        <div className="mr-3 py-2  rounded-md text-black text-sm font-medium">
                          <button className=" text-black hover:bg-teal-400 hover:text-white px-2  py-2 rounded-md text-sm font-medium">
                          <Link to="/login">
                              {/*여기에도  onClick={() => setSelectedIndex()} 추가 필요.*/}
                              Sign In
                            </Link>
                          </button>
                        </div>

                        {/* Profile + dropdown Header에서는 로그인/비로그인을 나눌 파트가 여기뿐임. bell Icon + profile로 div하나로 묶고 로그인/비로그인 나눠놓기. */}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {/*{open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}*/}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          {/**/}
        </div>
      </>
    );
  } else {
    return (
      <>
        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
        <div className="min-h-full sticky z-10 top-0 bg-white shadow ">
          <Disclosure as="nav" className="">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link className="font-kr font-bold" to="/" onClick={() => setSelectedIndex()}>
                          HOME
                        </Link>
                      </div>
                      <Navigation navigation={navigation} />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <div className="mr-3 px-3 py-2  rounded-md text-black text-sm font-medium">
                          <button
                            className=" text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => setstudyOpen(true)}
                          >
                            {/* <Link to="/"> */}
                            {/*여기에도  onClick={() => setSelectedIndex()} 추가 필요.*/}
                            Study
                            {/* </Link> */}
                          </button>
                        </div>

                        <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500 mr-10">
                          <input
                            type="text"
                            className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                            placeholder="Search"
                          />
                          <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
                            <svg
                              className="w-4 h-4 fill-current"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        {/*nav Bell */}
                        <button
                          type="button"
                          className="rounded-full bg-white p-1 text-gray-400 hover:text-black focus:outline-none focus:text-black focus:offset"
                          onClick={() => setOpenNoti((prev) => !prev)}
                        >
                          {/*BdropDown 추가 필요 + 몇개의 notification이 왔는지 빨간 글씨로 띄워주기.*/}
                          <FaRegBell
                            className="h-6 w-6 pr-1"
                            aria-hidden="true"
                          />

                          <span className="sr-only">5</span>
                        </button>
                        <div>
                        {openNoti && <NotiDropDown/>}

                        </div>

                        {/* Profile + dropdown Header에서는 로그인/비로그인을 나눌 파트가 여기뿐임. bell Icon + profile로 div하나로 묶고 로그인/비로그인 나눠놓기. */}

                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-teal-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-500">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              ></img>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item, itemidx) => (
                                <Menu.Item key={itemidx}>
                                  {/*a태그 추후 Link 태그로 변경 요함.*/}
                                  {({ active }) => (
                                    <div
                                      onClick={() => {
                                        if (item.name === "Your Profile") {
                                          setOpen(true);
                                        } else if (item.name === "Sign out") {
                                          onClickLogOut();
                                        }
                                      }}
                                      className={classNames(
                                        active ? "bg-teal-500 text-white" : "",
                                        "block px-4 py-2 text-sm text-center text-black hover:bg-teal-400 hover:text-white"
                                      )}
                                    >
                                      {item.name}
                                    </div>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {/*{open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}*/}
                      </Disclosure.Button>
                    </div>
                  </div>
                  <StudyModal
                    studyopen={studyopen}
                    studyonClose={() => setstudyOpen(false)}
                  >
                    <StudyJoin />
                  </StudyModal>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-teal-500 text-white"
                            : "text-gray-300 hover:bg-teal-300 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <FaRegBell className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/**/}
        </div>
        <ProfileModal open={open} onClose={() => setOpen(false)} className="">
          <div className="user-profile">
            <div className="wrapper">
              <div className="container profile verticalCenter">
                <div className="profile-container">
                  <div className="row profile-email">
                    <div class="emailAddress ">
                      <div className="relative">
                        <div className="absolute mt-32">
                          <input
                            type="file"
                            accept="image/*"
                            id="file-input"
                            style={{ display: "none" }} // input을 숨김
                          />
                          <label className="flex-none">
                            <CameraIcon
                              handleImageUpload={() =>
                                document.getElementById("file-input").click()
                              }
                            />
                          </label>
                        </div>
                        <img
                          src={user.image}
                          // src={image}
                          className="w-20 h-20 mx-auto bg-white rounded-full -mt-16 border-8 border-white object-cover"
                        />
                      </div>
                      <div className="flex">
                        <h3 className="emailAddress mr-4 text-center text-3xl font-medium">
                          {user.email}
                        </h3>
                        <button className="pass-chg-btn mt-2 text-teal-500 bg-gray-100 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                          비밀번호 변경
                        </button>
                      </div>
                    </div>
                    <div className="form-group nicknameArea mt-2 mb-2">
                      <label className="profileLabel font-bold">닉네임</label>
                      <input
                        autocomplete="off"
                        name="userNickname"
                        type="text"
                        maxlength="25"
                        placeholder="닉네임"
                        title="닉네임"
                        class="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    </div>
                    <div className="form-group formSingleLine mt-6 mb-3 flex gap-14 md:!gap-14">
                      <label className="profileLabel floatType font-bold ">
                        성별
                      </label>
                      <label className="selectFormFloat clearfix">
                        <input type="radio" value="male" class="radioBtn" />
                        <span className="selectFormTx">남자</span>
                      </label>
                      <label className="selectFormFloat clearfix">
                        <input type="radio" value="female" class="radioBtn" />
                        <span className="selectFormTx">여자</span>
                      </label>
                      <label className="selectFormFloat clearfix">
                        <input type="radio" value="none" class="radioBtn" />
                        <span className="selectFormTx">설정 안 함</span>
                      </label>
                    </div>
                    <div className="form-group mb-2">
                      <label className="profileLabel font-bold">생년월일</label>
                      <input
                        type="hidden"
                        data-input=""
                        placeholder="생년월일을 입력해 주세요"
                        title="생년월일을 입력해 주세요"
                        className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
                      />
                      <input
                        className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500"
                        placeholder="생년월일을 입력해 주세요"
                        tabindex="0"
                        type="text"
                        readonly="readonly"
                      />
                    </div>
                    <div class="form-group flex justify-between text-area-field mb-2">
                      <label for="birth" className="profileLabel font-bold">
                        내 각오
                      </label>
                      <span className="pr-3 ">{commentTextLength}/1000</span>
                    </div>
                    <textarea
                      autocomplete="off"
                      value={commentText}
                      onChange={handleCommentTextChange}
                      maxlength="1000"
                      placeholder="올해에는 반드시! 기필코! 합격한다!"
                      className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-900 rounded-md placeholder-gray-500 resize-none -mt-2"
                    />

                    <div className="form-group my-category flex-col">
                      <label for="favorite" className="profileLabel font-bold">
                        내 관심 카테고리
                      </label>
                      <div className="my-favorite-category">
                        <button className="rounded-2xl  h-12 w-full bg-teal-500 font-bold text-lg text-white relative overflow-hidden">
                          내 관심 카테고리 설정하기
                        </button>
                        <div class="my-favorite-category-summary mt-4">
                          <ul>
                            <hr />
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="createBtnRec text-left mt-4">
                      <button className="rounded-2xl h-12 w-full bg-teal-500 font-bold text-lg text-white relative overflow-hidden">
                        프로필 설정 완료
                      </button>
                    </div>
                    <div className="withdrawal-btn-wrapper text-center mt-4">
                      <button className="withdrawalBtn text-gray-400">
                        회원 탈퇴
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProfileModal>
      </>
    );
  }
}

function Navigation({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    selectedNavigationIndex
  );

  return (
    <div className="hidden md:block md:ml-6">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item, index) => (
          <Link
            key={item.name}
            to={`/${item.href}`}
            onClick={() => setSelectedIndex(index)}
            className={classNames(
              index === selectedIndex
                ? "bg-teal-500 text-white"
                : "text-black hover:bg-teal-400 hover:text-white",
              "px-3 py-2 rounded-md text-sm font-medium"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
