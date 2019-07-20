search_box=undefined
search_btn=undefined

document.addEventListener("DOMContentLoaded", ready)

function ready() {
    search_box = document.querySelector("input[type='text']")
    search_btn = document.querySelector("input[type='button']")

    document.addEventListener("keydown", keydown, false)
    search_btn.addEventListener("click", searchAndShowResults , false)

    buildsearchIndex()
}

function keydown(e) {
    // Hijack browser's ctrl+F
    if(e.key == "f" && e.ctrlKey) {
        e.preventDefault()

        search_box.select();
        search_box.focus()
        search_box.scrollIntoView()
    }

    if(e.key == "Enter" && e.target.tagName == "INPUT") {
        document.querySelector("input[type='button']").click()
    }
}

searchIndexForShikigami=[]
searchIndexForHints=[
    {"shikigami": "red imp", "hints": "赤鬼, red ghost, slapping butt"},
    {"shikigami": "yellow imp", "hints": "太鼓, drum, 一つ目, single eye"},
    {"shikigami": "blue imp", "hints": "凧, kite, 青い肌, blue skin"},
    {"shikigami": "nurikabe", "hints": "石壁, wall, stone, moss"},
    {"shikigami": "mio", "hints": "桜木, cherry tree, 赤い, red, 妖艶, seductive, 赤尾, red tail"},
    {"shikigami": "zashiki", "hints": "鬼火, orb, 角, horn, 幸運, fortune, 富, wealth"},
    {"shikigami": "koi", "hints": "池, pond, 尾, tail, 泡, bubbles"},
    {"shikigami": "kappa", "hints": "太鼓, pond, 蓮の葉, water lily leaf, 水球, water ball, 川, river"},
    {"shikigami": "oguna", "hints": "献祭, offering, 翼, wings, 羽衣, feathers"},
    {"shikigami": "doujo", "hints": "娘, little girl, 翼, wings, feather coat"},
    {"shikigami": "kodokushi", "hints": "poison, 蟲, bugs"},
    {"shikigami": "karasu tengu", "hints": "薙刀, naginata, 翼, wings, 仮面, mask"},
    {"shikigami": "kusa", "hints": "タンポポ, dandelion, チン, ding, healing"},
    {"shikigami": "samurai x", "hints": "兵甲, armor, 石化, petrified, hardened, katana"},
    {"shikigami": "ushi no toki", "hints": "木槌, wooden hammer, 藁人形, straw doll, scarecrow, curse nail, cursed dart"},
    {"shikigami": "hitotsume", "hints": "一つ目, one eye, 坊主, monk, 金剛経, diamond sutra"},
    {"shikigami": "shouzu", "hints": "扇子, fan, 水, water, 貝殻, shell, 尾, tail"},
    {"shikigami": "ame onna", "hints": "tears, rain, umbrella"},
    {"shikigami": "chocho", "hints": "drum, cute, mini drum, little fairy"},
    {"shikigami": "yamawaro", "hints": "怪力, strong, 石錘, stone hammer, 一つ目, single eye"},
    {"shikigami": "jikikaeru", "hints": "ceramic, cheat, gambling, mahjong"},
    {"shikigami": "inugami", "hints": "katana, bird, house, protection, purple dog"},
    {"shikigami": "hone onna", "hints": "bones, 怨恨, hatred, sword"},
    {"shikigami": "umibozu", "hints": "海, sea, mustache, 杖, cane, fisherman, beard, staff"},
    {"shikigami": "kyonshi ani", "hints": "蝋燭, candles, 棺桶, coffins"},
    {"shikigami": "puppeteer", "hints": "人形, puppet, 操縦, control"},
    {"shikigami": "momiji", "hints": "a beautiful fairy, accessories"},
    {"shikigami": "yumekui", "hints": "鈴, bell, 悪夢, nightmare"},
    {"shikigami": "momo", "hints": "花, flower, 舞, dance"},
    {"shikigami": "mouba", "hints": "お椀, bowl, zither, bitey"},
    {"shikigami": "vampira", "hints": "コウモリ, bat, 血, blood"},
    {"shikigami": "kuro mujou", "hints": "黒鎌, black scythe, tanto sword"},
    {"shikigami": "shiro mujou", "hints": "冥界, underworld, 白, white, 命を奪う, taking life"},
    {"shikigami": "kamaitachi", "hints": "槌, hammer, まぐわ, rake, 剣, sword, plow, katana"},
    {"shikigami": "youko", "hints": "書生, scholar, 仮面, mask, 紙扇, paper fan"},
    {"shikigami": "ootengu", "hints": "feathers, flute, 扇, fan, big winds wind"},
    {"shikigami": "enma", "hints": "雲, cloud, 冥界, underworld, 鬼の面, ghost mask"}
]
function buildsearchIndex() {
    let DOMTable = document.querySelectorAll("tbody > tr")

    for(let tableRow of DOMTable) {
        searchIndexForShikigami.push(tableRow.dataset.name.toLowerCase())
    }
}

function searchAndShowResults(e) {
    var shikigamiResults = searchIndexForShikigami.filter(x => x.includes(search_box.value.toLowerCase()))
    shikigamiResultsIndexes = []

    for(shikigamiResult of shikigamiResults) {
        shikigamiResultsIndexes.push(searchIndexForShikigami.indexOf(shikigamiResult))
    }

    var hintResultsIndexes = []
    for(hint of searchIndexForHints) {
        if(hint.hints.includes(search_box.value.toLowerCase())) {
            let shikigamiIndex = searchIndexForShikigami.indexOf(hint.shikigami)
            hintResultsIndexes.push(shikigamiIndex)
        }
    }

    let DOMTable = document.querySelectorAll("tbody > tr")
    let i=0
    for(let tableRow of DOMTable) {
        if((shikigamiResultsIndexes.indexOf(i) > -1) ||
           (hintResultsIndexes.indexOf(i) > -1)) {
            tableRow.style.display=""
        } else {
            tableRow.style.display="none"
        }

        i++
    }
	console.log(shikigamiResultsIndexes)
    if(shikigamiResultsIndexes.length > 0) {
		console.log("scrollIntoView1")
        DOMTable[shikigamiResultsIndexes[0]].scrollIntoView()
    }
    if(hintResultsIndexes.length > 0) {
		console.log("scrollIntoView1")
        DOMTable[hintResultsIndexes[0]].scrollIntoView()
    }
}
