// 在这里定义就绪队列的长度
queueNum = 5
// 任务列表
queueList = []
// 时间片大小
timecut = 3
// 接收各算法最终的总用时
timeConsumeList = []

// 菜单展示
function showTitle(){
    console.log('----------------------------------')
    console.log('            进程调度的模拟         ')
    console.log('----------------------------------')
    console.log('|--------选项--------------------|')
    console.log('|           1.FCPS调度法         |')
    console.log('|--------------------------------|')
    console.log('|           2.SJF调度算法        |')
    console.log('|--------------------------------|')
    console.log('|           3.优先调度算法        |')
    console.log('|--------------------------------|')
    console.log('|           4.RR调度算法         |')
    console.log('|--------------------------------|')
}

// 获取指定范围内的随机数
function getRandomNumber(a,b){
    return Math.ceil(Math.random()*(b-a)+a)
}

// 初始化队列
function initQueue(){
    for(var i=0;i<queueNum;i++){
        var progress = []
        // id
        progress.push(i+1)
        // arrivetime
        progress.push(0)
        // cupTime
        progress.push(0)
        // alltime
        progress.push(getRandomNumber(0,200))
        // priority
        progress.push(getRandomNumber(0,10))
        // state
        progress.push(0)
        queueList.push(progress)
    }
}

// 就绪队列展示
function showQueue(){
    console.log(
        'ID\t\tArrivetime\t\tCPUtime\t\tAlltime\tPriority\tstate'
    )
    var progress = ''
    for(var i=0;i<queueNum;i++){
        progress = ''
        progress += queueList[i][0]
        progress += '\t\t'
        progress += queueList[i][1]
        progress += '\t\t'
        progress += queueList[i][2]
        progress += '\t\t'
        progress += queueList[i][3]
        progress += '\t\t'
        progress += queueList[i][4]
        progress += '\t\t'
        progress += queueList[i][5]
        console.log(progress)
    }
}

// 选择算法进行计算
function algorithmInterface(){
    console.log('FCFS调度算法')
    FCFS_fun()
    console.log('SJF调度算法')
    SJF_fun()
    console.log('优先调度算法')
    FIRST_fun()
    console.log('RR调度算法')
    RR_fun()
}

// FCFS调度法
function FCFS_fun(){
    var finishList = []
    for(var i=1;i<=queueList.length;i++){
        finishList.push(i-1)
         console.log('第'+i+'次执行算法后的就绪队列：')
         console.log(
            'ID\t\tArrivetime\tCPUtime\t\tAlltime\t\tPriority\tstate'
        )
        for(var j=i;j<queueList.length;j++){
            var progress = ''
            progress += queueList[j][0]
            progress += '\t\t'
            progress += queueList[j][1]
            progress += '\t\t'
            progress += queueList[j][2]
            progress += '\t\t'
            progress += queueList[j][3]
            progress += '\t\t'
            progress += queueList[j][4]
            progress += '\t\t'
            progress += queueList[j][5]
             console.log(progress)
        }
    }
    // 计算进程等待总时间
    var totalTime = 0
    for(var i=0;i<queueList.length;i++){
        totalTime += queueList[finishList[i]][3]*(queueNum-i)
    }
    showFinished('FCFS',finishList,totalTime)
}

// SJF调度
function SJF_fun(){
    var finishList = []
    var alltimeArr = []
    for(var i=0;i<queueList.length;i++){
        alltimeArr.push([i,queueList[i][3]])
    }
    alltimeArr.sort(
        function(x,y){
            return x[1] - y[1]
        }
    )
    // 得到列表的执行顺序
    for(var i=0;i<alltimeArr.length;i++){
        finishList.push(alltimeArr[i][0])
    }
    // 准备执行
     console.log('当前拥有最大优先级的块号为:\n',finishList[0])
    for(var i=0;i<finishList.length;i++){
         console.log('第'+(i+1)+'次执行算法后的就绪队列：')
         console.log(
            'ID\t\tArrivetime\tCPUtime\t\tAlltime\t\tPriority\tstate'
        )
        for(var j=0;j<queueList.length;j++){
            // 如果该进程是finish的，则直接结束
            var flag = 0
            for(var k=0;k<=i;k++){
                if(j === finishList[k]){
                    flag = 1
                }
            }
            if(flag) continue
            var progress = ''
            progress += queueList[j][0]
            progress += '\t\t'
            progress += queueList[j][1]
            progress += '\t\t'
            progress += queueList[j][2]
            progress += '\t\t'
            progress += queueList[j][3]
            progress += '\t\t'
            progress += queueList[j][4]
            progress += '\t\t'
            progress += queueList[j][5]
             console.log(progress)
        }
    }
    // 计算总共消耗的时间
    var totalTime = 0
    for(var i=0;i<queueList.length;i++){
        totalTime += queueList[finishList[i]][3] * (queueNum - i)
    }
    showFinished('SJF',finishList,totalTime)
}

// 优先调度算法
function FIRST_fun(){
    var finishList = []
    var alltimeArr = []
    for(var i=0;i<queueList.length;i++){
        alltimeArr.push([i,queueList[i][4]])
    }
    alltimeArr.sort(
        function(x,y){
            return y[1] - x[1]
        }
    )
    // 得到列表的执行顺序
    for(var i=0;i<alltimeArr.length;i++){
        finishList.push(alltimeArr[i][0])
    }
    // 准备执行
     console.log('当前拥有最大优先级的块号为:\n',finishList[0])
    for(var i=0;i<finishList.length;i++){
         console.log('第'+(i+1)+'次执行算法后的就绪队列：')
         console.log(
            'ID\t\tArrivetime\tCPUtime\t\tAlltime\t\tPriority\tstate'
        )
        for(var j=0;j<queueList.length;j++){
            // 如果该进程是finish的，则直接结束
            var flag = 0
            for(var k=0;k<=i;k++){
                if(j === finishList[k]){
                    flag = 1
                }
            }
            if(flag) continue
            var progress = ''
            progress += queueList[j][0]
            progress += '\t\t'
            progress += queueList[j][1]
            progress += '\t\t'
            progress += queueList[j][2]
            progress += '\t\t'
            progress += queueList[j][3]
            progress += '\t\t'
            progress += queueList[j][4]
            progress += '\t\t'
            progress += queueList[j][5]
             console.log(progress)
        }
    }
    // 计算总共消耗的时间
    var totalTime = 0
    for(var i=0;i<queueList.length;i++){
        totalTime += queueList[finishList[i]][3] * (queueNum - i)
    }
    showFinished('FIRST',finishList,totalTime)
}

// 时间片调度算法
function RR_fun(){
     console.log('时间片大小为：',timecut)
    var finishList = []
    // 记录总用时
    var totaltime = 0
    // 记录当前正在运行的线程数
    var threadNum = queueNum
    while(1===1){
        var flag = 1
        // 进行检查，如果所有进程任务都完成了则直接退出
        for(var i=0;i<queueList.length;i++){
            if(queueList[i][3] > 0){
                flag = 0
            }
        }
        if(flag) break
        for(var i=0;i<queueList.length;i++){
            if(queueList[i][3] === 0){
                continue
            }
            else if(queueList[i][3] <= timecut){
                totaltime += timecut*threadNum
                queueList[i][3] = 0
                 console.log('              完成进程'+(i+1))
                finishList.push(i)
                threadNum--
            }
            else{
                totaltime += timecut*threadNum
                queueList[i][3] -= timecut
                 console.log('执行线程',i+1,'     该进程的ALLtime变为',queueList[i][3])
            }
        }
    }
    showFinished('RR',finishList,totaltime)
}

// 展示完成遍历后的列表
function showFinished(title,finishList,totalTime) {
    console.log('完成顺寻为：')
    console.log(
        'ID\t\tArrivetime\tCPUtime\t\tAlltime\t\tPriority\tstate'
    )
    for(var i=0;i<finishList.length;i++) {
        var progress = ''
        progress += queueList[finishList[i]][0]
        progress += '\t\t'
        progress += queueList[finishList[i]][1]
        progress += '\t\t'
        progress += queueList[finishList[i]][2]
        progress += '\t\t'
        progress += queueList[finishList[i]][3]
        progress += '\t\t'
        progress += queueList[finishList[i]][4]
        progress += '\t\t'
        progress += queueList[finishList[i]][5]
        console.log(progress)
    }
    console.log('每个进程等待的平均时间为：',totalTime/queueNum)
    console.log('所有进程等待的总时间为：',totalTime)
    timeConsumeList.push([title,totalTime])
}

function showEnding(){
    for(var i=0;i<timeConsumeList.length;i++){
        console.log('算法名：',timeConsumeList[i][0],'消耗总时间：',timeConsumeList[i][1],'平均耗费时间：',timeConsumeList[i][1]/queueNum)
    }
    timeConsumeList.sort(
        function(x,y){
            return x[1]-y[1]
        }
    )
    console.log('最优的算法为:',timeConsumeList[0])
}

function main(){
    showTitle()
    initQueue()
    showQueue()
    algorithmInterface()
    showEnding()
}

main()