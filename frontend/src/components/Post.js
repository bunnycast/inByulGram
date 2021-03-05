import React from 'react';
import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import './Post.scss'

function Post({ post }) {
    const { caption, location, photo } = post;
    return (
        <div>
            <Card
                hoverable
                cover={<img src={photo} alt={caption} />}
                actions={[<HeartFilled />]}
            >
                <Card.Meta
                    avatar={<Avatar icon={<UserOutlined />} size="large" />}
                    title={location}
                    description={caption}
                />
            </Card>
            {/*<img src={photo} alt={caption} style={{width: "100px"}}/>*/}
            {/*{caption}, {location}*/}
        </div>
    );
}

export default Post;