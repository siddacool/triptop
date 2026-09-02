<script lang="ts">
  import { resolve } from '$app/paths';
  import Icon from '@iconify/svelte';
</script>

<ul class="LinkList">
  <li class="BuildDetails">
    <a href={resolve('/site-details.json')} target="_blank">
      <div class="Icon">
        <Icon icon="carbon:build-run" />
      </div>
      Build details
    </a>
  </li>
  <div class="Separator"></div>
  <li>
    <a href="https://github.com/siddacool/triptop/blob/main/CHANGELOG.md" target="_blank">
      <div class="Icon">
        <Icon icon="bi:file-text" />
      </div>
      Changelog
    </a>
  </li>
</ul>

<style lang="scss">
  .LinkList {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    margin-top: calc(var(--dodo-ui-space) * 7);
    padding-left: calc(var(--dodo-ui-space) * 3);

    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .Separator {
      display: none;

      @media (min-width: 600px) {
        display: flex;
        width: 3px;
        height: 3px;
        background-color: var(--dodo-color-neutral-600);
        border-radius: 50%;
        margin: 0 var(--dodo-ui-space);
      }
    }

    li {
      display: flex;
      margin: 0;
      padding: 0;
      margin-bottom: calc(var(--dodo-ui-space) * 2.5);

      @media (min-width: 600px) {
        margin-bottom: 0;
        margin: 0 var(--dodo-ui-space);
      }
    }

    a {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      color: var(--dodo-color-primary-700);
      cursor: pointer;
      text-decoration: none;

      &:hover {
        color: var(--dodo-color-primary-600);
        text-decoration: underline;
      }

      .Icon {
        display: inline-flex;
        margin-right: var(--dodo-ui-space);
        font-size: 1.3rem;
      }
    }

    .BuildDetails {
      .Icon {
        font-size: 1.6rem;
      }
    }
  }
</style>
