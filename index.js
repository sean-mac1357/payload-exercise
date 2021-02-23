'use strict';

const { createStore } = Redux;

console.log('Starting Banking App for multiple accounts!');

// Store
const defaultState = {
    checking: 100,
    savings: 100
};

// Actions
(() => {
    const checking = document.querySelector('#checking');
    const savings = document.querySelector('#savings');
    checking.innerHTML = defaultState.checking;
    savings.innerHTML = defaultState.savings;
})();
const actionDeposit = 'deposit';
const actionWithdrawal = 'withdrawal'
const createDeposit = (account, amount) => {
    return {
        type: actionDeposit,
        payload: {
            account,
            amount
        }
    };
}
const createWithdrawal = (account, amount) => {
    return {
        type: actionWithdrawal,
        payload: {
            account,
            amount
        }
    };
}

// Reducer
const accounts = (state = defaultState, action) => {
    switch(action.type) {
        case actionDeposit:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] + action.payload.amount
            };
        case actionWithdrawal:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] - action.payload.amount
            }
        default:
            return state;
    }
}

const store = createStore(
    accounts,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log('=== State Has Updated ===');
    const state = store.getState();
    console.log("the state is:", state);
    const checking = document.querySelector('#checking');
    checking.innerHTML = state.checking;
    const savings = document.querySelector('#savings');
    savings.innerHTML = state.savings;
});

const checkingDepositButton = document.querySelector('#checkingDeposit');
const savingsDepositButton = document.querySelector('#savingsDeposit');
const checkingWithdrawalButton = document.querySelector('#checkingWithdrawal');
const savingsWithdrawalButton = document.querySelector('#savingsWithdrawal');
const depositAmount = document.querySelector('#depositAmount');
const withdrawalAmount = document.querySelector('#withdrawalAmount');

checkingDepositButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(depositAmount.value);
    store.dispatch(createDeposit("checking", amountValue));
})

savingsDepositButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(depositAmount.value);
    store.dispatch(createDeposit("savings", amountValue));
})

checkingWithdrawalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(withdrawalAmount.value);
    store.dispatch(createWithdrawal("checking", amountValue));
})

savingsWithdrawalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(withdrawalAmount.value);
    store.dispatch(createWithdrawal("savings", amountValue));
})
