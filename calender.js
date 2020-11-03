'use strict'

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();    //０からは始まるので５月を指しています。

  const getCalenderHead = () => {
    const dates = [];
    const d = new Date(year,month,0).getDate();   //末日を取得します
    const n = new Date(year,month,1).getDay();    //getDayは曜日を0~6で取得できる

    let i = 0;
    while( i < n ) {
      dates.unshift({
        date:d -i,
        isToday:false,
        isDisable:true,
      });
      i++;
    }
    return dates;
  }



  const getCalenderBody = () => {   //日付を取得する関数
    const dates =[];   //日付を入れて行きます。
    const lastDate = new Date(year,month + 1 , 0).getDate();
    //日付オブジェクトで翌月の０番目の日付をしてすることで末日が取れる
    //getDate();でその日付を取得できる

    let i = 1;    //１から末日までを回す。
    while(i <= lastDate) {
      dates.push({
        date:i,
        isToday:false,
        isDisable:false,
      });
      i++;
    }

    if(year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;

  }

  const getCalenderEnd = () => {  //カレンダーの後ろの方の関数
    const dates = [];
    const lastDay = new Date (year,month + 1,0).getDay(); //今月末の曜日を取得

    let i = 1;
    while( i < 7 - lastDay) {
      dates.push({
        date:i,
        isToday:false,
        isDisable:true,
      });
      i++;
    }
    return dates;
  }

  const createCalender = () => {
    const tbody = document.querySelector('tbody');

    while(tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    const title = `${year}/${String(month + 1).padStart(2,'0')}`;
    document.getElementById('title').textContent = title;
    const dates =[
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderEnd(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    let i =0;
    while(i < weeksCount) {
      weeks.push(dates.splice(0,7));
      i++;
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if(date.isToday){
          td.classList.add('today');
        }
        if(date.isDisable) {
          td.classList.add('disable');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if(month < 0 ){
      year--;
      month = 11;
    }
    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if(month > 11 ){
      year++;
      month = 0;
    }
    createCalender();
  });

  document.getElementById('today').addEventListener('click', () => {
  year = today.getFullYear();
  month  = today.getMonth();
  
    createCalender();
  });

  createCalender();

}