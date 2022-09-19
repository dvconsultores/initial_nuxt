import Router from "vue-router";
import Vue from "vue";

Vue.component("I18nLink", {
  name: "I18nLink",
  functional: true,
  render(h, { children, data, props, parent }) {
    // Get the current locale
    const locale = parent.$i18n.locale;
    const locales = parent.$i18n.locales;

    const path =
      typeof props.to === "string"
        ? prependLocaleToPath(locale, props.to, locales)
        : {
            ...props.to,
            path: prependLocaleToPath(locale, props.to.path, locales)
          };

    return h(
      "nuxt-link",
      {
        ...data,
        props: {
          ...props,
          to: path
        }
      },
      children
    );
  }
});

const routerPush = Router.prototype.push;
// const routerReplace = Router.prototype.replace;

function prependLocaleToPath(locale, path, locales) {
  let localizedPath = path;
  // if the URL doesn't start with the locale code
  if (!locales.some((loc) => path.startsWith(`/${loc.code}`))) {
    // prepend the URL
    localizedPath = `/${locale}${path}`;
  }

  return localizedPath;
}

export default function UpdateRedirect(ctx) {
  const redirect = ctx.redirect;
  ctx.redirect = function localizedRedirect(...args) {
    const locale = ctx.app.i18n.locale;
    const locales = ctx.app.i18n.locales;
    // figure out which part of the args is the URL as the first argument can occasionally be a status code
    const pathIdx = typeof args[0] === "number" ? 1 : 0;
    // localize the path in-place
    args[pathIdx] = prependLocaleToPath(locale, args[pathIdx], locales);

    return redirect(...args);
  };

  function withLocalizedPath(fn) {
    return function (...args) {
      const locale = ctx.app.i18n.locale;
      const locales = ctx.app.i18n.locales;
      let path = args[0];

      // if the URL doesn't start with the locale code
      if (typeof path === "string") {
        // prepend the URL
        path = prependLocaleToPath(locale, path, locales);
      } else if (typeof path === "object" && path) {
        path = {
          ...path,
          path: prependLocaleToPath(locale, path.path, locales)
        };
      }

      return fn.apply(this, [path, ...args.slice(1)]);
    };
  }

  Router.prototype.push = withLocalizedPath(routerPush);
  // Router.prototype.replace = withLocalizedPath(routerReplace);
}
