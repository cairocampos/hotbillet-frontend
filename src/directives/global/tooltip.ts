import {Directive, DirectiveBinding} from 'vue';

const CUSTOM_CLASS = 'tooltip__custom';
const CUSTOM_ATTRIBUTE = 'data-tooltip';
const POSITIONS = ['top', 'bottom', 'left', 'right'];
const DEFAULT_POSITION = 'top';

type PositionType = 'top' | 'bottom' | 'left' | 'right';

function generateId() {
    return `${CUSTOM_CLASS}-${Date.now()}`;
}

function createTooltipElement(id:string, position: PositionType): HTMLElement {
    const divTooltip = document.createElement('div');
    divTooltip.classList.add(CUSTOM_CLASS);
    divTooltip.classList.add(`${CUSTOM_CLASS}-${position}`);    
    divTooltip.setAttribute('id', id);

    return divTooltip;
}

function calculatePositionLeft(
    elementPositionLeft:number,
    middleTargetWidth:number,
    middleTooltipWidth:number,
    position: string
) {
    let positionLeft = 0;
    if(['top', 'bottom'].includes(position)) {
        if(middleTargetWidth > middleTooltipWidth) {
            positionLeft = elementPositionLeft + (middleTargetWidth - middleTooltipWidth);
        } else {
            positionLeft = elementPositionLeft - (middleTooltipWidth - middleTargetWidth);
        }
    } else {
        if(position == 'left') {
            positionLeft = elementPositionLeft - ((middleTooltipWidth * 2) + 10);
        } else if(position == 'right') {
            positionLeft = elementPositionLeft + ((middleTargetWidth * 2) + 10);
        }
    }

    return positionLeft;
}

function calculatePositionTop(
        elementPositionTop:number,
        middleTargetHeight:number,
        middleTooltipHeight:number,
        position: PositionType
    ) {

    function compareHeight() {
        if(middleTargetHeight > middleTooltipHeight) {
            return elementPositionTop + (middleTargetHeight - middleTooltipHeight);
        }

        return elementPositionTop - (middleTooltipHeight - middleTargetHeight);
    }

    const exec = {
        top() {
            return elementPositionTop - (middleTooltipHeight + 10);
        },
        bottom() {
            return elementPositionTop + (middleTooltipHeight + 10);
        },
        left() {
            return compareHeight();
        },
        right() {
            return compareHeight();
        }
    }

    return exec[position]();
}

const tooltipDirective: Directive = {
    created(el: HTMLElement, binding: DirectiveBinding) {
        el.addEventListener('mouseenter', function () {
            const id = generateId();
            el.setAttribute(CUSTOM_ATTRIBUTE, id);
            const elementPositionTop = el.getBoundingClientRect().top + window.scrollY;    
            const elementPositionLeft = el.getBoundingClientRect().left + window.scrollX;
            
            const content = binding.value?.text ?? binding.value;
            const position = POSITIONS.includes(binding.value?.position) ? binding.value.position : DEFAULT_POSITION;

            const divTooltip = createTooltipElement(id, position);
            divTooltip.innerHTML = content;
            document.body.appendChild(divTooltip);

            const middleTargetWidth = el.offsetWidth / 2
            const middleTooltipWidth = divTooltip.offsetWidth / 2;
            const positionLeft = calculatePositionLeft(elementPositionLeft, middleTargetWidth, middleTooltipWidth, position);

            const middleTargetHeight = el.offsetHeight;
            const middleTooltipHeight = divTooltip.offsetHeight;
            const positionTop = calculatePositionTop(elementPositionTop, middleTargetHeight, middleTooltipHeight, position);

            divTooltip.style.transform = `translate3d(${positionLeft}px, ${positionTop}px, 0)`;

        }, false)

        el.addEventListener('mouseleave', function () {
            const id = el.getAttribute(CUSTOM_ATTRIBUTE);
            el.removeAttribute(CUSTOM_ATTRIBUTE);
            const tooltipElement = document.querySelector(`#${id}`);
            if(tooltipElement)
                tooltipElement.remove();
        })
    }
}

export default tooltipDirective;