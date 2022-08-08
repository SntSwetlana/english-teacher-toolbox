const initialData = {
    tasks: {
        'word-1': {id: 'word-1', content: 'preservation'},
        'word-2': {id: 'word-2', content: 'protect'},
        'word-3': {id: 'word-3', content: 'tracker'},
        'word-4': {id: 'word-4', content: 'conservation'},
        'word-5': {id: 'word-5', content: 'identify'},
        'word-6': {id: 'word-6', content: 'naturalist'},
        'word-7': {id: 'word-7', content: 'inspire'},
    },
    columns: {
        'column-1': {id: 'column-1', title: 'Word List', taskIds: ['word-1','word-2','word-3','word-4','word-5','word-6','word-7']},
        'column-2': {id: 'column-2', title: 'People\'s Jobs' , taskIds: []},
        'column-3': {id: 'column-3', title: 'Good Ideas', taskIds: []},
        'column-4': {id: 'column-4', title: 'Actions', taskIds: []},
        },

    columnOrder : ['column-1','column-2','column-3','column-4'],

    answers:{
        'column-1': {id: 'column-1', title: 'Word List', taskIds: []},
        'column-2': {id: 'column-2', title: 'Peoples Jobs' , taskIds: ['word-3','word-6']},
        'column-3': {id: 'column-3', title: 'Good Ideas', taskIds: ['word-1','word-4']},
        'column-4': {id: 'column-4', title: 'Actions', taskIds: ['word-7','word-5','word-2']},
    },
    theme: {
        'correct':      { main: 'mediumseagreen'},
        'incorrect' :   { main: 'palevioletred'}
    },
    isCorrect: false,
    count: 0,
    strIsCorrect: 'correct'
};

export default initialData;
