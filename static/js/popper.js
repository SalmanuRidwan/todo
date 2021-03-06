/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e, t) { 'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t() })(this, function() {
        'use strict';

        function e(e) { return e && '[object Function]' === {}.toString.call(e) }

        function t(e, t) { if (1 !== e.nodeType) return []; var o = getComputedStyle(e, null); return t ? o[t] : o }

        function o(e) { return 'HTML' === e.nodeName ? e : e.parentNode || e.host }

        function n(e) { if (!e) return document.body; switch (e.nodeName) {
                case 'HTML':
                case 'BODY':
                    return e.ownerDocument.body;
                case '#document':
                    return e.body; } var i = t(e),
                r = i.overflow,
                p = i.overflowX,
                s = i.overflowY; return /(auto|scroll)/.test(r + s + p) ? e : n(o(e)) }

        function r(e) { var o = e && e.offsetParent,
                i = o && o.nodeName; return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : e ? e.ownerDocument.documentElement : document.documentElement }

        function p(e) { var t = e.nodeName; return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e) }

        function s(e) { return null === e.parentNode ? e : s(e.parentNode) }

        function d(e, t) { if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement; var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                i = o ? e : t,
                n = o ? t : e,
                a = document.createRange();
            a.setStart(i, 0), a.setEnd(n, 0); var l = a.commonAncestorContainer; if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l); var f = s(e); return f.host ? d(f.host, t) : d(e, s(t).host) }

        function a(e) { var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
                o = 'top' === t ? 'scrollTop' : 'scrollLeft',
                i = e.nodeName; if ('BODY' === i || 'HTML' === i) { var n = e.ownerDocument.documentElement,
                    r = e.ownerDocument.scrollingElement || n; return r[o] } return e[o] }

        function l(e, t) { var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                i = a(t, 'top'),
                n = a(t, 'left'),
                r = o ? -1 : 1; return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e }

        function f(e, t) { var o = 'x' === t ? 'Left' : 'Top',
                i = 'Left' == o ? 'Right' : 'Bottom'; return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + i + 'Width'], 10) }

        function m(e, t, o, i) { return J(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0) }

        function h() { var e = document.body,
                t = document.documentElement,
                o = ie() && getComputedStyle(t); return { height: m('Height', e, t, o), width: m('Width', e, t, o) } }

        function c(e) { return se({}, e, { right: e.left + e.width, bottom: e.top + e.height }) }

        function g(e) { var o = {}; if (ie()) try { o = e.getBoundingClientRect(); var i = a(e, 'top'),
                    n = a(e, 'left');
                o.top += i, o.left += n, o.bottom += i, o.right += n } catch (e) {} else o = e.getBoundingClientRect(); var r = { left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top },
                p = 'HTML' === e.nodeName ? h() : {},
                s = p.width || e.clientWidth || r.right - r.left,
                d = p.height || e.clientHeight || r.bottom - r.top,
                l = e.offsetWidth - s,
                m = e.offsetHeight - d; if (l || m) { var g = t(e);
                l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m } return c(r) }

        function u(e, o) { var i = ie(),
                r = 'HTML' === o.nodeName,
                p = g(e),
                s = g(o),
                d = n(e),
                a = t(o),
                f = parseFloat(a.borderTopWidth, 10),
                m = parseFloat(a.borderLeftWidth, 10),
                h = c({ top: p.top - s.top - f, left: p.left - s.left - m, width: p.width, height: p.height }); if (h.marginTop = 0, h.marginLeft = 0, !i && r) { var u = parseFloat(a.marginTop, 10),
                    b = parseFloat(a.marginLeft, 10);
                h.top -= f - u, h.bottom -= f - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b } return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = l(h, o)), h }

        function b(e) { var t = e.ownerDocument.documentElement,
                o = u(e, t),
                i = J(t.clientWidth, window.innerWidth || 0),
                n = J(t.clientHeight, window.innerHeight || 0),
                r = a(t),
                p = a(t, 'left'),
                s = { top: r - o.top + o.marginTop, left: p - o.left + o.marginLeft, width: i, height: n }; return c(s) }

        function w(e) { var i = e.nodeName; return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || w(o(e)) }

        function y(e, t, i, r) {
            var p = { top: 0, left: 0 },
                s = d(e, t);
            if ('viewport' === r) p = b(s);
            else { var a; 'scrollParent' === r ? (a = n(o(t)), 'BODY' === a.nodeName && (a = e.ownerDocument.documentElement)) : 'window' === r ? a = e.ownerDocument.documentElement : a = r; var l = u(a, s); if ('HTML' === a.nodeName && !w(s)) { var f = h(),
                        m = f.height,
                        c = f.width;
                    p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = c + l.left } else p = l }
            return p.left += i, p.top += i, p.ri