/**
 * Created by icepoint1999 on 24/02/2017.
 */

export  function log(type,before,after) {
    return function (target,value,method) {
        return {
            value: function (...args) {
                // 记录日志
                console.log(type)
                // 前置
                before()
                //执行方法
                method.value(args)

                after()
            }
        };
    }

}
