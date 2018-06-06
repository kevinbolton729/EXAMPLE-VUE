<template>
    <div>
        <channel-top></channel-top>
        <div class="w3-section w3-content">
            <form-user-editpwd></form-user-editpwd>
        </div>
    </div>
</template>

<script>
import channelTop from '@/components/bases/others/channel-top';
import formUserEditpwd from '@/components/bases/forms/form-user-editpwd';

export default {
  components: {
    channelTop,
    formUserEditpwd
  }
};
</script>