import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import '../../scss/components/_PostScheleton.scss'

export default function PostScheletonNormalScheleton() {
    return (
        <div>
            <div className="PostScheleton">
                <div className="PostScheleton__header">
                    <div className="PostScheleton__header-userinfo">
                        <div className="PostScheleton__header-avatar" />
                        <div className="PostScheleton__header-info">
                            <div className="PostScheleton_animated-line PostScheleton_animated-line--profile" />
                            <div className="PostScheleton_animated-line PostScheleton_animated-line--datetime" />
                            <div className="PostScheleton__body">
                                <div className="PostScheleton_animated-line PostScheleton_animated-line--body-long" />
                                <div className="PostScheleton_animated-line PostScheleton_animated-line--body-short" />
                                <div className="PostScheleton_animated-line PostScheleton_animated-line--body-medium" />
                                <div className="PostScheleton_animated-line PostScheleton_animated-line--body-long" />
                                <div className="PostScheleton_animated-line PostScheleton_animated-line--body-short" />
                            </div>
                        </div>
                    </div>
                    <EllipsisOutlined />
                </div>
            </div>
        </div>
    )
}
