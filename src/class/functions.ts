export const makeUid = (length: number, withSymbol: boolean = false): string => {
    let uid = '';
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${withSymbol ? `&é'(-è_çà)=~#{[|\`\\^@]}^¨$£¤ù*%µ,;:!?./§<>²/*-+` : ''}`;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) uid += characters.charAt(Math.floor(Math.random() * charactersLength));
    return uid;
};