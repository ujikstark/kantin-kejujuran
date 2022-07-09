import axios from "../config/axios";


export async function getCanteenBalance() {
    const canteenBalance = await axios.get('/api/canteen')
        .then(response => response.data)
        .catch(() => []);
    return canteenBalance;
}

export async function editCanteenBalance(newBalance) {

    const payload = {
        balance: newBalance,
        
    };

    const newCanteenBalance = await axios.put('/api/canteen', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => []);
    
    return newCanteenBalance;
}

export async function editUserBalance(newBalance, username) {

    const payload = {
        balance: newBalance,
        
    };

    const newUserBalance = await axios.put('/api/user/'+ username + '/balance', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => []);

    return newUserBalance;
    
}