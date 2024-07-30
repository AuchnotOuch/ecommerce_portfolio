import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = () => {
    return (
        <Timeline
            dataSource={{
                sourceType: 'profile',
                screenName: 'chakra_ui'
            }}
            options={{
                height: '400',
                theme: 'light',
                borderColor: '#ffffff',
                chrome: 'noheader, nofooter, noborders, transparent'
            }}
        />
    );
};

export default TwitterFeed;
