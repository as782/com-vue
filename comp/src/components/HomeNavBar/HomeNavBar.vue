<template>
    <div class="dock-container" ref="dockContainerRef">
        <div class="dock-menu" ref="dockMenuRef">
            <div v-for="(item, index) in dockItems" :key="index" class="dock-item-box" :data-index="index">
                <div class="gap" :style="{ width: `${item.gap}px` }"></div>
                <div class="dock-item" :class="{ active: item.active }" :style="{
                    transform: `scale(${item.scale})  translateY(${item.translateY}px) `,
                    width: `${state.size}px`,
                    height: `${state.size}px`,
                }">
                    <router-link :to="item.path">
                        <img :src="item.icon" alt="icon" />
                    </router-link>

                    <div class="title">{{ item.title }}</div>
                </div>
                <div class="gap" :style="{ width: `${item.gap}px` }"></div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
interface Props {
    navItem: {
        icon: string;
        path: string;
        title: string;
    }[],
    gap?: number;
    maxScale?: number;
    maxY?: number;
    sigma?: number; // 控制缩放和位移的平滑度
    range?: number; // 控制缩放影响的范围 max:navItem.length/2
    size: number;
}
interface DockItem {
    icon: string;
    path: string;
    title: string;
    scale: number;
    translateY: number;
    gap: number;
    active: boolean;

}

type DockState = Required<Omit<Props, 'navItem'>> & Pick<DockItem, 'active'>;

const props = withDefaults(defineProps<Props>(), {
    gap: 20,
    maxScale: 1.5,
    maxY: -100,
    sigma: 1,
    range: 2
})


const state = reactive<DockState>({
    gap: props.gap / 2, //控制间距
    maxScale: props.maxScale, // 控制缩放的最大值
    maxY: props.maxY, // 控制位移的最大值
    sigma: props.sigma, // 控制缩放和位移的平滑度
    range: props.range, // 控制缩放影响的范围 max:navItem.length/2
    active: false,// 控制激活状态，显示必要内容
    size: props.size // 控制item大小
})

const dockContainerRef = ref<HTMLElement | null>(null);


const dockMenuRef = ref<HTMLElement | null>(null);
const dockItems = ref<DockItem[]>([]);


const initDockItems = () => {
    dockItems.value = props.navItem.map(item => ({
        ...item,
        scale: 1,
        translateY: 0,
        gap: state.gap,
        active: state.active
    }))
}

const handleMouseOver = (event: MouseEvent) => {


    const target = event.target as HTMLElement | null;
    const box = target?.classList.contains('dock-item-box')
    if (box) {
        const index = parseInt(target?.dataset.index!);
        updateDockItems(index);
    }
};

const handleMouseLeave = () => {
    initDockItems()
};

const updateDockItems = (centerIndex: number) => {

    const maxTranslateY = state.maxY; // 纵向位移的最大值
    const gap = state.gap;// 间距
    const maxScale = state.maxScale; // 缩放的最大值
    const sigma = state.sigma;// 标准差，调整以控制分布宽度
    const range = state.range;// 控制缩放影响的范围 max:navItem.length/2

    // 中心轴
    const midX = centerIndex;


    dockItems.value = dockItems.value.map((item, index) => {
        const x = index;
        const distance = Math.abs(x - midX);

        // 正态分布计算y坐标
        const y = Math.exp(-Math.pow(distance, 2) / (2 * Math.pow(sigma, 2)));

        let scaleFactor;
        let offset;
        let translateYFactor;
        if (distance > range / 2) {
            scaleFactor = 1
            offset = gap
            translateYFactor = 0;
        } else {
            // 将y坐标映射到缩放因子，保证缩放因子在1到maxScale之间
            scaleFactor = 1 + (maxScale - 1) * y;
            offset = gap + gap * scaleFactor;
            translateYFactor = maxTranslateY * y;
        }

        return {
            ...item,
            scale: scaleFactor,
            translateY: translateYFactor,
            gap: offset,
            active: index === midX
        };
    });
};

onMounted(() => {

    initDockItems()
    dockMenuRef.value && dockMenuRef.value.addEventListener('mouseover', handleMouseOver);
    dockMenuRef.value && dockMenuRef.value.addEventListener('mouseleave', handleMouseLeave);
})
onBeforeUnmount(() => {
    dockMenuRef.value && dockMenuRef.value.removeEventListener('mouseover', handleMouseOver);
    dockMenuRef.value && dockMenuRef.value.removeEventListener('mouseleave', handleMouseLeave);
})
</script>

<style scoped>
.dock-container {
    position: fixed;
    /* left: 0; */
    /* right: 0; */
    bottom: 200px;
    /* width: 100%; */
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: #2121216e;
    border-radius: 10px;
    box-shadow: 0 2px 5px #202020bd;
    backdrop-filter: blur(3px) saturate(90%);

}





.dock-menu {
    display: flex;
    background-color: transparent;

}

.dock-item-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    background-color: transparent;

}



.gap {
    transition: all 0.2s;
    visibility: hidden;
}

.dock-item {
    position: relative;
    border-radius: 12px;
    padding: 10px;
    /* background-color: rgb(216, 216, 247); */
    /* #2121216e primary */
    box-shadow: 0 2px 5px #202020bd;
    background-color: #202020bd;
    transition: transform 0.2s;
}

.dock-item .title {
    user-select: none;
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -25%;

}

.dock-item.active .title {
    width: 90%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 8px;
    border-radius: 1rem;
    color: #fff;
    cursor: pointer;


}

.dock-item img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
