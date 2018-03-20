<template>
  <div class='icon'>
    <div :is='name' :style='{stroke: color}'>
    </div>
  </div>
</template>

<script>
import Star from './Star'
import ChevronUp from './ChevronUp'
import ChevronDown from './ChevronDown'
import Grid from './Grid'
import Link from './Link'
import Aperture from './Aperture'
import ExternalLink from './ExternalLink'
import Heart from './Heart'
import Maximize from './Maximize'
import CameraOff from './CameraOff'
import DollarSign from './DollarSign'
import Smartphone from './Smartphone'
import Box from './Box'
import Home from './Home'
import User from './User'
import AlertOctagon from './AlertOctagon'
import Zap from './Zap'
import MoreHorizontal from './MoreHorizontal'
import Trash from './Trash'
import PlusSquare from './PlusSquare'
import Type from './Type'
import Tag from './Tag'
import CrossSquare from './CrossSquare'
import Camera from './Camera'
import Twitter from './Twitter'
import Inbox from './Inbox'
import Search from './Search'

export default {
  components: {
    Star,
    ChevronDown,
    ChevronUp,
    Grid,
    Link,
    Aperture,
    ExternalLink,
    Heart,
    Maximize,
    CameraOff,
    DollarSign,
    Smartphone,
    Box,
    Home,
    User,
    AlertOctagon,
    Zap,
    MoreHorizontal,
    Trash,
    PlusSquare,
    Type,
    Tag,
    CrossSquare,
    Camera,
    Twitter,
    Inbox,
    Search
  },
  props: ['name', 'color']
}
</script>

<style lang='scss' scoped>
svg {
  display: block;
  stroke-width: 2;
}
.icon.gradient {
  height: $spacing * 4;
  width: $spacing * 4;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    // background: rgba($brand_color, .2);
    border-radius: 50%;
    position: absolute; left: 0; right: 0; top: 0; bottom: 0;
    transition: background .1s ease;
  }

  svg {
    position: relative;
    stroke: $brand_color;
    transition: stroke .15s ease-in-out;
    fill: rgba($brand_color, .1);
    width: 20px;
  }

  &.active {
    &:before {
      opacity: 1;
      background: linear-gradient(-128deg, #98E6FC 1%, $brand_color 96%);
    }
    svg {
      fill: rgba(white, .15);
      stroke: white;
    }
  }
}

.icon.small {
  svg {
    stroke: $text_color_extra_light;
    width: 15px;
    height: 15px;
  }
}
</style>
