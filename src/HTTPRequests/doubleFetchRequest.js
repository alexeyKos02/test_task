async function withRetry(apiFunc, maxRetries = 3, retryDelay = 2000) {
    let currentAttempt = 1;
    while (currentAttempt <= maxRetries) {
        try {
            // Попытка выполнения API функции
            return await apiFunc();
        } catch (error) {
            // Проверяем, есть ли идентификатор ошибки в ответе
            const errorId = error.errorId || 'Неизвестный ID';
            console.error(`Ошибка (ID ${errorId}) при вызове API. Попытка ${currentAttempt} из ${maxRetries}`);
            if (currentAttempt === maxRetries) throw error; // После последней попытки бросить ошибку
            currentAttempt++;
            // Задержка перед следующей попыткой
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

// Пример использования
async function apiCall() {
    // Здесь должен быть ваш асинхронный код для вызова API
    // Например, имитация ошибки с идентификатором
    throw {errorMessage: "Произошла ошибка при вызове API", errorId: "123ERROR"};
}

// оборачиваем наш вызов API в функцию withRetry
withRetry(apiCall).catch(error => console.error("Ошибка при выполнении операции:", error));