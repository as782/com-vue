<script setup lang="ts">
import { onMounted } from 'vue';

// onMounted(() => {
//     const pSpanElemnts = document.querySelectorAll('.render-detail-content p span')
//     pSpanElemnts.forEach((p) => {
//         // 添加类名
//         p.classList.add('underline-animation')
//         // 为其父元素添加hover样式
//         p.parentElement?.classList.add('underline-animation-parent')
//     })
// })
// 创建指令
const vUnderlineAnimation = {
    mounted(el: HTMLElement) {
        // 给元素添加 css
        el.style.cssText = `
            background: linear-gradient(to right, #778875, #09e966);
            background-repeat: no-repeat;
            background-size: 0 2px;
            background-position: right bottom;
            transition: background-size 2s;
        `;

        // 为其父元素添加hover 
        el.parentElement?.addEventListener('mouseover', () => {
            el.style.backgroundSize = '100% 2px';
            el.style.backgroundPosition = 'left bottom';
        })
        // 移除hover
        el.parentElement?.addEventListener('mouseout', () => {
            el.style.backgroundSize = '0 2px';
            el.style.backgroundPosition = 'right bottom';
        })
    }
    ,
    unmounted(el: HTMLElement) {
        el.parentElement?.removeEventListener('mouseover', () => {
            el.style.backgroundSize = '0 2px';
            el.style.backgroundPosition = 'right bottom';
        })
        el.parentElement?.removeEventListener('mouseout', () => {
            el.style.backgroundSize = '100% 2px';
            el.style.backgroundPosition = 'left bottom';
        })
    }
}

</script>
<template>
    <div class="page-container">
        <div class="render-detail-article-content">
            <div class="render-detail-content cke-mode ">
                <div class="article-img"><img
                        src="https://boot-img.xuexi.cn/image/1004/process/a3bae96a377a4beb92c6b02271dd1d3f.jpg">
                    <div  class="article-img-desc"><span class="article-img-desc-icon"><i><svg viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="630"
                                    style="width: 1em; height: 1em; vertical-align: middle; fill: currentcolor; overflow: hidden;">
                                    <path d="M85.333333 853.333333L512 170.666667l426.666667 682.666666z" p-id="631">
                                    </path>
                                </svg></i></span >山东博物馆展出的济南瑞蚨祥昌记结帐谱。光明图片/视觉中国</div>
                </div>
            <h1 style="color: red;">
                <span  v-underline-animation >
                    通过指令实现了，在鼠标悬停时，文字下方出现下划线，并且下划线从右向左移动的效果。当鼠标移开时，下划线从左向右移动，最终消失。
                    <span>
                        文字使用span 元素包裹，指令绑定到span 元素上。在指令的mounted 钩子函数中，为span 元素添加了两个事件监听器，分别对应鼠标悬停和鼠标移开事件。在事件监听器中，通过修改span 元素的样式，实现了下划线的移动效果。

                    </span>

                </span>
                <br>
                <hr>
                <span v-underline-animation >
                    注意：需要有一个父元素来触发hover 事件，否则无法触发。主要是文字上触发，会在划到文字行距中hover消失。
                </span>
            </h1>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        对于表音文字而言，书写符号所表达的信息来源于口语的音义。而属于表意体系的汉字，则是以线条笔画为基本书写单位、由构件组合而成的方块符号，具有丰富的内涵和分析潜力。以汉字形体为依据，使用者往往能让汉字表达出音义之外的某些信息。例如，在某些特殊场合，人们可以用汉字的笔画、特征、构件甚至排序为依据，让某个与数词无关的汉字表达出数目信息。这种寓数于字的文化现象有久远的历史和深厚的群众基础，彰显了古今中外汉字使用者的才华和智慧。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span  v-underline-animation >

                        计数时“写正字”，是汉字文化圈特有的现象。“正”由横竖交替的五画写成，以“正”表示五，不论是划记还是核对，都十分方便。相比世界其他地区需要另行借助非字划记符号而言，汉字使用者可以根据需要让许多汉字表示它的笔画数。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        敦煌《降魔变文》中有“和尚得胜，击金鼓而下金筹；佛家若强，扣金钟而点尚字”的记载。所谓“点尚字”，就是逐笔写“尚”字计数，每个“尚”都表示十（折笔算作两笔）。这一习俗在出土文书《唐西州高昌县顺义乡户别计数帐》和《唐神龙二年白涧屯纳官仓粮帐》中都能看到。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span  v-underline-animation>

                        在著于1657年的日本古籍《算元记》中，统计商品用的是“写玉字”法，每个“玉”都表示五，侧面反映了生意人求富聚财的心理。故宫博物院还有数块写着“亭前垂柳珍重待春风（風）”或“春前庭柏风（風）送香盈室”等九个汉字的牌子。据《清稗类钞·时令类》介绍，这是宫中冬季“数九”迎春的道具“九九消寒图”。其中“句各九言，言各九画，其后双钩之……自冬至始，日填一画，凡八十一日而毕事”，这种寓数于字又连缀佳句的设计，让枯燥的冬日“数九”顿生情趣。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        此外，笔画数是每个汉字都具备的客观属性。这使得人名、机构名等汉字条目可以借助其中汉字的笔画数进行排序，从而避免音序法受多音字干扰的缺陷。2008年北京奥运会开幕式上，各个国家和地区的代表团就以简化汉字的笔画数为序入场，彰显了中国特色。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        用非数字的普通汉字表数，更多时候是为了保密。汉字是构件组合而成的符号，自古以来人们就有将字形离合、重组、讲解、发挥的习俗。于是，一些和数字相关的汉字构件便成了寓数于字的有效手段。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        我国对八十八、九十九和一百零八岁高寿分别有“米寿”“白寿”“茶寿”的雅称。“米”“白”“茶”本与数词无关，“米”的字形像倒“八”与“十”“八”；“白”可理解为“百”中减“一”；“茶”可分析为上部的二“十”与中、下的“八十八”，加起来恰好是一百零八。这个习俗传到日本之后，当地还出现了分别表示七十七、八十、八十一、九十、一百一十一岁的“喜寿”“傘寿”“半寿”“卒寿”和“皇寿”。《日本国语大辞典》解释，“喜”的一种草书像“七十七”连写，“傘”的俗体“仐”像“八十”，“半”可分解成倒“八”与“十一”，“卒”的简体“卆”像“九十”，“皇”则是上部的“百减一”加下部的“十二”。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        此外，《通俗编·识余》记载，当时的金属行业用“豆、贝、某、長、人、土、木、令、王、合”表示一至十。其中，“某”在古代简写作“厶”，是“叁”的上部，表示“叁”；“令”指“捌”中的“另”，表示“捌”；其余八字，都是从大写数字中拆出的局部构件，分别代表“壹”“贰”“肆”“伍”“陆”“柒”“玖”“拾”。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        清末玉器业也曾用“旦、竺、春、罢、悟、交、化、未、丸、田”加密一至十，因为“旦”下有“一”，“竺”下有“二”，“春”上含“三”，“罢”上像“四”，“悟”中有“五”，“交”上为“六”，“化”右似“七”，“未”下似“八”，“丸”字含“九”，“田”中为“十”。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        汉字还可寄寓它在特定篇章中的序数。例如，“天”是《千字文》的首字，所以从《水浒传》开始就有了“天字第一号”的说法。清代当铺据此用“天、地、元、黄、宇、宙、洪、昌、日、月、盈、者、辰、宿、列、张、安、来”表示一至十八，标明一年半赎当期的月份数。和原版《千字文》比较，这里除了改“玄”为“元”以避康熙讳外，还把带有消极寓意的“荒、仄、寒”换成了音近的“昌、者、安”。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        电报传入我国后，出于经济考虑，当时曾一度用“地支”以及《平水韵》韵目表示月份和日期。《平水韵》是当时文人烂熟于胸的诗韵字谱，其中的韵目都有固定排序。相对《千字文》、“干支”这些名篇而言，商家加密数字更倾向于个性化文本。同样是表示一至十，北京“荣货堂”以《说岳全传》中的“是非终日有，不为自己身”为记；“通学斋”则以《清夜吟》中的“月到天心处，风来水面时”为约；“瑞蚨祥”则自拟联语“瑞蚨交近友，祥气招远财”悬于店内，将价格用汉字密写在商品不起眼处，供店员掌握。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke">
                    <span>

                        寓数于字反映了古今中外汉字使用者对这一书写符号的独到理解，展现了汉字在记录语言之外的信息表达潜能。这些寓数汉字，一方面在笔画、形体、结构、排序上要符合数目表达的条件，另一方面在音义上也需符合公序良俗，满足人们趋吉避凶的文化追求。挖掘和探讨这类民俗用字现象，对丰富和发展中国特色语言文字学研究有积极意义。
                    </span>
                </p>
                <p class="text_align-justify text_indent-2em" data-source="cke"><strong
                        data-source="cke">（作者系湖南师范大学文学院副教授）</strong></p>
            </div>
            <div class="detail-pagination-wrap">
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
p {
    font-size: 20px;
}

// .underline-animation {
//     background: linear-gradient(to right, #778875, #09e966);
//     background-repeat: no-repeat;
//     background-size: 0 2px;
//     background-position: right bottom;
//     transition: background-size 2s;
// }

// p:hover .underline-animation {
//     background-position: left bottom;
//     background-size: 100% 2px;
// }</style>