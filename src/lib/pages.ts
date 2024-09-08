export interface Page {
    title: string;
    src: string;
    contents?: string[]
}

export const pages: Page[] = [
    {
        title: '概要',
        src: 'start',
        contents: [
            'start',
            'how-to-read',
            'composition',
        ],
    },
    {
        title: '活動',
        src: 'activity',
        contents: [
            'mission',
            'announcement',
        ],
    },
    {
        title: '部室の備品との使い方',
        src: 'how-to-use',
        contents: [
            '315room',
            'note-pc',
            'common-pc',
        ],
    },
    {
        title: '情報モラル・リテラシー',
        src: 'moral-literacy',
        contents: [
            'ai',
            'moral',
            'literacy',
        ],
    },
    {
        title: 'Slack',
        src: 'slack',
    },
    {
        title: 'Admin',
        src: 'admin',
    }
]