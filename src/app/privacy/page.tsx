import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description:
    "AI 工程师之路 隐私政策。了解我们如何收集、使用、存储和保护您的个人信息，以及您在个人信息处理活动中享有的权利。",
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    id: "overview",
    title: "一、引言",
    content: (
      <>
        <p>
          AI 工程师之路（以下简称&ldquo;<strong>本站</strong>&rdquo;或&ldquo;<strong>我们</strong>&rdquo;）深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等，保护您的个人信息。
        </p>
        <p>
          本《隐私政策》（以下简称&ldquo;<strong>本政策</strong>&rdquo;）适用于您通过本网站（及其相关子域名）使用我们的产品或服务。请您在使用我们的产品或服务之前，仔细阅读并充分理解本政策的全部内容。尤其是以<strong>加粗或下划线</strong>形式提示您注意的条款。
        </p>
        <p>
          一旦您开始访问或使用本站，即视为您已同意本政策所声明的收集、使用、共享、存储和保护个人信息的相关规则。如您不同意本政策的任何内容，请您立即停止使用本站。
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "二、我们如何收集和使用您的个人信息",
    content: (
      <>
        <p>
          个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。本站作为面向开发者的人工智能应用学习平台，遵循&ldquo;最小必要&rdquo;原则，仅收集为实现服务功能所必需的信息。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （一）您主动提供的信息
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>意见反馈与联系：</strong>
            当您通过站内表单、邮箱或社交渠道主动与我们联系时，我们会收集您主动提供的姓名、邮箱、联系方式以及沟通内容，仅用于回复您的咨询或处理您的反馈。
          </li>
          <li>
            <strong>评论与互动：</strong>
            如本站未来开通评论、社区或投稿功能，您发布的内容及相关昵称、头像等信息将予以公开显示。
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （二）我们自动收集的信息
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>日志信息：</strong>
            当您访问本站时，服务器会自动记录访问日志，包括 IP 地址、浏览器类型、操作系统、访问时间、访问页面、来源页面等。这些信息用于保障网站安全、分析访问趋势及优化用户体验。
          </li>
          <li>
            <strong>设备信息：</strong>
            包括设备型号、操作系统版本、屏幕分辨率、语言设置等，用于优化页面展示效果。
          </li>
          <li>
            <strong>Cookies 及同类技术：</strong>
            我们使用 Cookies 和本地存储来记住您的偏好设置（如主题模式、语言），并分析网站使用情况。您可以通过浏览器设置管理或删除 Cookies，但可能会影响部分功能的正常使用。
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （三）无需征得您同意的情形
        </h3>
        <p>在以下情形中，我们收集、使用个人信息无需征得您的同意：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>与国家安全、国防安全直接相关的；</li>
          <li>与公共安全、公共卫生、重大公共利益直接相关的；</li>
          <li>与刑事侦查、起诉、审判和判决执行等直接相关的；</li>
          <li>法律法规规定的其他情形。</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "三、我们如何使用您的个人信息",
    content: (
      <>
        <p>我们仅会出于以下目的使用您的个人信息：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>为您提供学习路线、技术博客、项目实战、面试题库等内容服务；</li>
          <li>回复您的咨询、反馈，处理您的服务请求；</li>
          <li>分析网站访问数据，改进产品功能、内容质量和用户体验；</li>
          <li>保障网站安全，防范、识别和处理欺诈、恶意访问等风险；</li>
          <li>履行法律法规规定的义务或监管要求。</li>
        </ul>
        <p>
          当我们要将个人信息用于本政策未载明的其他用途时，会事先征求您的同意。当我们要将基于特定目的收集而来的信息用于其他目的时，也会事先征求您的同意。
        </p>
      </>
    ),
  },
  {
    id: "share",
    title: "四、我们如何共享、转让、公开披露您的个人信息",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （一）共享
        </h3>
        <p>
          除以下情形外，我们不会向任何第三方共享您的个人信息：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>获得您的明确同意后；</strong>
          </li>
          <li>
            <strong>与授权合作伙伴共享：</strong>
            为实现服务功能，我们可能委托第三方服务提供商提供部分服务（例如网站托管、内容分发网络、流量分析、邮件送达等）。我们会与合作伙伴签署数据处理协议，要求其严格按照我们的指示和本政策处理个人信息，并采取必要的保密和安全措施。
          </li>
          <li>
            <strong>根据法律法规规定或行政、司法机关的强制性要求。</strong>
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （二）转让
        </h3>
        <p>
          我们不会将您的个人信息转让给任何公司、组织或个人。但如发生合并、收购、资产转让等交易，我们将要求接收方继续受本政策约束；如接收方变更个人信息使用目的，将重新征求您的同意。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          （三）公开披露
        </h3>
        <p>
          我们仅会在获得您的同意，或基于法律法规、行政或司法机关强制性要求的情况下，公开披露您的个人信息。
        </p>
      </>
    ),
  },
  {
    id: "storage",
    title: "五、我们如何存储您的个人信息",
    content: (
      <>
        <p>
          <strong>存储地点：</strong>
          我们收集的个人信息存储在中华人民共和国境内（不含港澳台地区）的服务器上。如需跨境传输，我们将按照法律法规要求进行安全评估并征求您的同意。
        </p>
        <p>
          <strong>存储期限：</strong>
          我们仅在为实现本政策所述目的所必需的最短期限内存储您的个人信息。在超出该期限后，我们将删除或匿名化处理您的个人信息，但法律法规另有规定的除外。
        </p>
      </>
    ),
  },
  {
    id: "protection",
    title: "六、我们如何保护您的个人信息",
    content: (
      <>
        <p>
          我们采用业界通行的安全技术和管理措施来保护您的个人信息，防止信息遭到未经授权的访问、披露、使用、修改、损毁或丢失，包括但不限于：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>使用 HTTPS 加密传输数据；</li>
          <li>对敏感信息进行加密存储；</li>
          <li>实施访问权限控制和身份认证机制；</li>
          <li>定期进行安全评估和漏洞修复；</li>
          <li>建立数据安全事件应急预案。</li>
        </ul>
        <p>
          尽管我们已采取上述合理可行的措施，但请您理解，互联网环境并非百分之百安全，我们无法保证信息传输和存储的绝对安全性。如不幸发生个人信息安全事件，我们将及时启动应急预案，并在法定时限内告知您事件情况、应对措施及您可采取的自我保护建议。
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "七、您在个人信息处理活动中的权利",
    content: (
      <>
        <p>根据相关法律法规，您对您的个人信息享有以下权利：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>查阅与复制：</strong>
            您有权查阅和获取我们持有的关于您的个人信息副本。
          </li>
          <li>
            <strong>更正与补充：</strong>
            当您发现我们持有的您的个人信息有误或不完整时，有权要求我们更正或补充。
          </li>
          <li>
            <strong>删除：</strong>
            在法律法规规定的情形下，您有权要求我们删除您的个人信息。
          </li>
          <li>
            <strong>撤回同意：</strong>
            您可随时撤回您此前对我们处理个人信息的同意，但不影响撤回前已进行的处理。
          </li>
          <li>
            <strong>账号注销：</strong>
            如本站未来提供账号体系，您有权注销您的账号。
          </li>
          <li>
            <strong>投诉举报：</strong>
            您有权对本站处理个人信息的行为进行投诉举报。
          </li>
        </ul>
        <p>
          如您需要行使上述权利，请通过本政策末尾的联系方式与我们取得联系。我们将在收到您的请求后 15 个工作日内回复。为保障信息安全，我们可能需要核验您的身份后再处理您的请求。
        </p>
      </>
    ),
  },
  {
    id: "minor",
    title: "八、未成年人信息的保护",
    content: (
      <>
        <p>
          本站主要面向具有一定编程基础的开发者和学习者。如果您是未满 14 周岁的未成年人，请在监护人陪同下阅读本政策，并在使用本站前取得监护人的同意。
        </p>
        <p>
          如果我们发现在未事先获得监护人同意的情况下收集了未成年人的个人信息，我们将尽快删除相关信息。监护人发现我们违反法律法规规定收集了未成年人个人信息，可通过本政策末尾的联系方式与我们联系，我们将在收到通知后尽快删除相关数据。
        </p>
      </>
    ),
  },
  {
    id: "update",
    title: "九、本政策的更新",
    content: (
      <>
        <p>
          随着本站业务的发展或法律法规的变化，我们可能不时对本政策进行修订。当本政策发生重大变更时，我们将通过网站公告、弹窗提示或邮件通知等显著方式告知您。
        </p>
        <p>
          对于非重大性质的修订，我们将以更新日期在本页面顶部予以标注。如您在政策生效后继续使用本站，即视为您同意更新后的政策；如您不同意，请您停止使用本站。
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "十、联系我们",
    content: (
      <>
        <p>
          如您对本政策或个人信息保护有任何疑问、意见或建议，可通过以下方式与我们联系：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>备案信息：粤ICP备2023124211号</li>
          <li>
            联系邮箱：<a href="mailto:574291562@qq.com" className="text-primary-600 hover:underline dark:text-primary-400">574291562@qq.com</a>
          </li>
        </ul>
        <p>
          我们将在收到您的请求并核验您的身份后的 15 个工作日内予以回复。如您对我们的处理结果不满意，您还可以向相关主管部门投诉举报。
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            隐私政策
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            本政策说明我们如何收集、使用、共享、存储和保护您的个人信息，以及您在个人信息处理活动中享有的权利。
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            更新日期：2026 年 7 月 31 日
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                目录
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-slate-500 hover:text-primary-600 transition-colors dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-3 max-w-3xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
