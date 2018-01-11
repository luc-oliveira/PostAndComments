export default function uuid() {
    /**
     *  function catch from thread :
     *    https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}
