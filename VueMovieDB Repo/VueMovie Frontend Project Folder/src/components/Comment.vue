<template>
  <div class="commentBox">
    <div class="imageNameDateGrid">
      <div class="Spaceblock" />
      <img class="posterImage" :src="authorImage" />
      <div class="Spaceblock" />
      <div class="Authorname">
        {{ comment.authorname }}
      </div>
      <div class="Spaceblock" />
      <img
        v-if="comment.authorname === currentUser && !editMode"
        @click="editComment"
        class="editImage"
        src="../images/black_pen.png"
      />
      <img
        v-if="comment.authorname === currentUser && editMode"
        @click="saveComment"
        class="floppyIcon"
        src="../images/black_floppy.png"
      />
      <div class="Spaceblock" />
      <img
        v-if="comment.authorname === currentUser"
        @click="removeComment"
        class="trashImage"
        src="../images/dark_trash.png"
      />
      <div v-else class="SpaceBlock" />
      <div class="Spaceblock" />
      <div class="dateDiv">
        {{ date }}
      </div>
      <div class="Spaceblock" />
    </div>
    <div v-if="!editMode" class="textDiv">
      {{ comment.content }}
    </div>
    <div class="editTextDiv">
      <textarea
        v-if="editMode"
        name="editedComment"
        class="editComment"
        rows="5"
        cols="33"
        :placeholder="comment.content"
        v-model="wantedContent"
      />
    </div>
  </div>
</template>
<script>
import store from '../store';

export default {
  name: 'Comment',
  props: ['comment'],
  emits: ['deleteComment'],
  data() {
    return {
      authorImage: this.comment.authorurl,
      date: this.comment.timestamp,
      currentUser: localStorage.getItem('username'),
      editMode: false,
      wantedContent: this.comment.content,
    };
  },

  async mounted() {
    let offset = new Date().getTimezoneOffset() * -1;
    this.date = new Date(new Date(this.comment.timestamp).getTime() + offset)
      .toString()
      .substring(4, 25)
      .substring(0, 17);
  },

  methods: {
    async saveComment() {
      let updateCommentRes = await fetch(
        '/rest/comments/updateComment/' +
          this.comment.id +
          '/' +
          this.wantedContent,
        {
          method: 'PUT',
        }
      );
      this.comment.content = this.wantedContent;
      this.editMode = false;
    },
    editComment() {
      this.editMode = true;
    },
    async removeComment() {
      let deleteCommentRes = await fetch(
        '/rest/comments/deleteComment/' + this.comment.id,
        {
          method: 'DELETE',
        }
      );
      this.$emit('deleteComment', this.comment.id);
    },
  },
};
</script>

<style scoped>
.Authorname,
.dateDiv {
  margin-top: 10px;
}
.trashImage {
  width: 30px;
  height: 30px;
  margin-top: 2px;
}
.commentBox {
  width: 350px;
  background-color: white;
  height: max-content;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 13px;
  margin-bottom: 10px;
}
.editImage {
  width: 25px;
  height: 25px;
  margin-top: 5px;
}
.editComment {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  margin-top: 3px;
  display: block;
}
.floppyIcon {
  width: 34px;
  height: 34px;
}
.posterImage {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-left: 5px;
  margin-top: 5px;
}
.imageNameDateGrid {
  display: grid;
  grid-template-columns: 10px max-content 10px auto 10px max-content 5px max-content 5px max-content 10px;
}
.textDiv {
  margin-left: 55px;
  max-width: 250px;
}
</style>
