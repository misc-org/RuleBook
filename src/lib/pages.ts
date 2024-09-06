interface Page {
    title: string;
    src: string;
    contents?: Page[]
}

const pages: Page[] = [
    {
        title: '概要',
        src: 'start',
        contents: [
            {
                title: 'はじめに',
                src: 'start',
            },
            {
                title: 'このサイトの見かた',
                src: 'how-to-read',
            },
            {
                title: 'サイト構成',
                src: 'composition'
            },
        ]
    },
    {
        title: '活動',
        src: 'activity',
        contents: [
            {
                title: 'ミッション',
                src: 'mission',
            },
            {
                title: '活動報告会',
                src: 'announcement',
            }
        ]
    },
    {
        title: '教室の備品と使い方',
        src: 'how-to-use',
        contents: [
            {
                title: '315 教室の使い方',
                src: '315room',
            },
            {
                title: 'ノート PC の使い方',
                src: 'note-pc',
            },
            {
                title: '共用 PC の使い方',
                src: 'common-pc',
            },
        ]
    },
    {
        title: '情報モラル・リテラシー',
        src: 'moral-literacy',
        contents: [
            {
                title: '生成 AI の利用について',
                src: 'ai',
            },
            {
                title: '情報モラルについて',
                src: 'moral',
            },
            {
                title: '情報リテラシーについて',
                src: 'literacy',
            },
        ]
    },
    {
        title: 'Slack',
        src: 'slack',
    },
    {
        title: 'Admin',
        src: 'admin'
    },
]

export default pages