export default function randReg() {
    return Math.random().toString(36).slice(2, 10).toUpperCase();
}
