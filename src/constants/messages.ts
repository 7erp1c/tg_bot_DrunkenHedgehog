import * as process from 'node:process';

export const adminId = process.env.ADMIN_USER_ID;
export const resumeIdConstant = process.env.DB_ID;

export const messages = {
    welcome: (name?: string) => `
    Добро пожаловать, ${name || 'гость'}! 🔑

    Этот бот — моё профессиональное резюме. После ввода кода вы сможете:
    - Посмотреть моё портфолио 📂
    - Изучить профессиональный опыт 🏢
    - Узнать о моих навыках и контактах 💼

    Введите код доступа, чтобы продолжить!
    `,

    invalidCode: 'Неверный код. Попробуйте еще раз:',

    accessGranted: 'Доступ предоставлен! Вот ваше меню:',

    startCommand: 'Пожалуйста, используйте кнопки клавиатуры чата.',
};
