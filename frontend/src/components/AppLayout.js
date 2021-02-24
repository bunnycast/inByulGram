import React from 'react';
import { Input, Menu } from 'antd';
import "./AppLayout.scss"
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
import LogoImage from 'assets/logo.png';

function AppLayout({children}) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">
                    <img src={LogoImage} alt="logo" />
                </h1>
                <div className="search">
                    <Input.Search  />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>Menu1</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                    </Menu>
                </div>
            </div>
                <div className="contents">{children}</div>
                <div className="sidebar">
                    <StoryList style={{ marginBottom: "1rem" }}/>
                    <SuggestionList />
                </div>
                <div className="footer">
                    &copy; 2021. bunnycast
                </div>
        </div>
    );
}

export default AppLayout;