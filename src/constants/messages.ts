import * as process from 'node:process';

export const adminId = process.env.ADMIN_USER_ID;
export const resumeIdConstant = process.env.DB_ID;

export const messages = {
    welcome: (name?: string) => `
    Добро пожаловать, ${name || 'гость'}! 🔑
 
    Меня зовут Ратмир, и  я написал этого бота для интерактивного ознакомления с моим резюме.
    После ввода кода вы сможете:
    - Посмотреть моё портфолио 📂
    - Изучить профессиональный опыт 🏢
    - Узнать о моих навыках и контактах 💼
    - Посмотреть мой код на GitHub 👨‍💻
    - Оставить ОС 💬

    Отправьте сообщение с кодом доступа, чтобы продолжить!
    `,

    invalidCode: 'Неверный код. Попробуйте еще раз:',

    accessGranted: `
    Доступ предоставлен!
    Нажмите кнопку "Резюме", чтобы получить информацию обо мне.
    Вы можете оставить ОС.
    `,

    accessGrantedBack: `
    Нажмите кнопку "Резюме", чтобы получить информацию обо мне.
    Вы можете оставить ОС.
    `,
    accessGrantedBackExistFeedBack: `
    Нажмите кнопку "Резюме", чтобы получить информацию обо мне.
    Вы можете редактировать ОС.
    `,

    startCommand: 'Пожалуйста, используйте кнопки клавиатуры чата.',
};
