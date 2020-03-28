Vue.component('my-table',{
    props:{
        data:{
            type:Array,
            default:function () {
                return []
            }
        },
        column:{
            type:Array,
            default:function () {
                return []
            }
        }
    },
    data(){
        return {
            currentData:[],
            currentColumn:[]
        }
    },
    render: function(createElement){
        let _this = this;
        let ths = [];
        (this.currentColumn).forEach(element => {
            if(element.sortable){
                ths.push(createElement('th',{
                    class:{
                        cellSty:true
                    }
                },[
                    element.title,
                    createElement('a',{
                        on:{
                            click:function(){
                                _this.compareVal(element.key,'asc')
                            }
                        },
                        style:{
                            cursor:'pointer'
                        }
                    },'↓'),
                    createElement('a',{
                        on:{
                            click:function(){
                                _this.compareVal(element.key,'desc')
                            }
                        },
                        style:{
                            cursor:'pointer'
                        }
                    },'↑')
                ]))
            }else{
                ths.push(createElement('th',{
                    class:{
                        cellSty:true
                    }
                },element.title))
            }
            
        });
        let trs = [];
        (this.currentData).forEach(element => {
            let tds = [];
            (_this.currentColumn).forEach(item => {
                tds.push(createElement('td',{
                    class:{
                        cellSty:true
                    }
                },element[item.key]))
            })
            trs.push(createElement('tr',tds))
        })
        return createElement('div',[
            createElement('table',[
                createElement('thead',[
                    createElement('tr',[ths])
                ]),
                createElement('tbody'),[trs]
            ]),
            createElement('span',{
                class:{
                    btnSty:true
                },
                on:{
                    click:this.addRowData
                }
            },'新增行数据')
        ])
        
    },
    wathch:{
        currentData:{
            function (newValue,oldValue) { 

            },
            deep:true
        }
    },
    methods:{
        makeData(){
            this.currentData = this.data.map(function(col,index){
                return col
            })
        },
        makeColumn(){
            this.currentColumn = this.column.map(function(col,index){
                return col
            })
        },
        compareVal(proptyName,type){
            (this.currentData).sort(this.unitWay(proptyName,type))
        },
        unitWay(propertyName,type){
            if(type == 'asc'){
                return function (obj1,obj2) {
                    let val1 = obj1[propertyName];
                    let val2 = obj2[propertyName];
                    if(val2 < val1){
                        return 1
                    }else if(val2 > val1){
                        return -1
                    }else{
                        return 0
                    }
                }
            }else if(type == 'desc'){
                return function (obj1,obj2) {
                    let val1 = obj1[propertyName];
                    let val2 = obj2[propertyName];
                    if(val2 < val1){
                        return -1
                    }else if(val2 > val1){
                        return 1
                    }else{
                        return 0
                    }
                }
            }
        },
        addRowData(){
            let addData = {
                name:'韦小飞',
                age:18,
                birth:'2000-10-01',
                address:'address6'
            }
            this.currentData.push(addData)
        }
    },
    mounted(){
        this.makeData();
        this.makeColumn();
    }
})