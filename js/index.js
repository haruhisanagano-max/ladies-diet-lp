function init(){
    $('.body .blue').on('click',function(){
        $('.body .list').slideToggle()
        $(this).toggleClass('active')
    })

    $('.indoor .click-title').on('click',function(){
        $(this).next().slideToggle()
        $(this).toggleClass('active')
    })

    $('.data select').on('input',function(){
        $(this).addClass('active')
    })
    $('.count .click-title').on('click',function(){
        $(this).next().slideToggle()
        $(this).toggleClass('active')
    })

   // $('.fixed-left .left-item').on('click',function(){
   //  $('.fixed-left .left-item').removeClass('active')
   //  $(this).addClass('active')
   //  const idName=$(this).attr('data-target')
   //  const jumpEl=document.querySelector(idName)
   //  jumpEl.scrollIntoView({
   //      block:'start',
   //      behavior:'smooth'
   //  })
   // })
    $('.right-btn').on('click',function(){
        const footer=document.querySelector('.footer')
        footer.scrollIntoView({
            block:'start',
            behavior:'smooth'
        })
        
    })



    // $('.right-btn').on('mouseover',function(){
    //     $(this).addClass('onlineCls')
    //     setTimeout(()=>{
    //         $(this).removeClass('onlineCls')

    //     },1000)
    // })
    const swiper=new Swiper('.swiper1',{
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    $('.to-bottom, .today-btn, .reduce-btn').on('click',function(){
        const form=document.querySelector('.data')
        form.scrollIntoView({
            block:'start',
            behavior:'smooth'
        })
    });


    const gsList=document.querySelectorAll('.gs')
    const viewHeight=window.innerHeight
    const obs=new IntersectionObserver((e)=>{
        const el=e[0].target
        if(e[0].isIntersecting){
            el.classList.add('active')
            obs.unobserve(el)
        }
    },{
    })
    gsList.forEach((item)=>{
        obs.observe(item)
        const top=item.getBoundingClientRect().top-viewHeight
        if(top<0){
            item.classList.add('active')
        }
    })

    const points=document.querySelectorAll('.point')
    //console.log(points)
    const obs2=new IntersectionObserver((e)=>{
        const el=e[0].target
        if(e[0].isIntersecting){
            const idName=el.getAttribute('id')
            $('.left-item').removeClass('active')
            //console.log($(`.left-item[data-target="#${idName}"]`))
            $(`.left-item[data-target="#${idName}"]`).addClass('active')
        }
    })
    points.forEach((item,index)=>{
        obs2.observe(item)
        
    })

    // window.addEventListener('scroll',function(){
    //     const top=this.document.querySelector('.data').getBoundingClientRect().top-viewHeight
    //     console.log(top)
    //     if(top>0){
    //         $('data').addClass('active')
    //     }else{
    //         $('data').removeClass('active')
    //     }
    // })
    
}
document.addEventListener('DOMContentLoaded',init)