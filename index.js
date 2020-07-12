const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

// const Buy_book = "Buy_book";
// const intialState = {
//     numberOfBooks: 10,
//     numberOfPens: 15
// }
const initialSateBooks = {
    numberOfBooks: 10
}
const initialSatePens = {
    numberOfPens: 15
}

function buyBook() {
    return {type: "Buy_book", info: "My First Redux Code!"}
}
function buyPen() {
    return {type: "Buy_pen", info: "This is Good Pan"}
}
const BookReducer = (state = initialSateBooks, action) => {
    switch (action.type) {
        case "Buy_book":
            return {
                ...state,
                numberOfBooks: state.numberOfBooks - 1
            }
        default:
            return state
    }
}

const PenReducer = (state = initialSatePens, action) => {
    switch (action.type) {
        case "Buy_pen":
            return {
                ...state,
                numberOfPens: state.numberOfPens - 2
            }
        default:
            return state
    }
}
const Reducer = combineReducers({Book: BookReducer, Pen: PenReducer})

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            console.log("middleware log", result);
            return result
        }
    }
}
const store = createStore(Reducer, applyMiddleware(logger));
console.log("initial State", store.getState());
const unsubcribe = store.subscribe(() => {
    console.log('updated', store.getState())
});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubcribe();
