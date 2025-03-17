import * as React from "react"
import {ChevronLeft, ChevronRight, MoreHorizontal} from "lucide-react"

import {cn} from "@/shared/utils/cn"
import {Button, ButtonProps} from "@/shared/ui/button"
import {range} from "@/shared/utils/range"

const PaginationRoot = ({
                            className,
                            ...props
                        }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
PaginationRoot.displayName = "PaginationRoot"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({className, ...props}, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({className, ...props}, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationPrevious = ({
                                className,
                                ...props
                            }: React.ComponentProps<typeof Button>) => (
    <Button
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        variant="ghost"
        {...props}
    >
        <ChevronLeft className="h-4 w-4"/>
        <span>Previous</span>
    </Button>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
                            className,
                            ...props
                        }: React.ComponentProps<typeof Button>) => (
    <Button
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        variant="ghost"
        {...props}
    >
        <span>Next</span>
        <ChevronRight className="h-4 w-4"/>
    </Button>
)
PaginationNext.displayName = "PaginationNext"

type PaginationPageProps = {
    page: number
    isActive?: boolean
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<typeof Button>

const PaginationPage = ({
                            className,
                            isActive,
                            page,
                            ...props
                        }: PaginationPageProps) => (
    <Button
        aria-current={isActive ? "page" : undefined}
        size="icon"
        className={className}
        variant={isActive ? "outline" : "ghost"}
        {...props}
    >
        {page}
    </Button>
)
PaginationPage.displayName = "PaginationPage"

const PaginationEllipsis = ({
                                className,
                                ...props
                            }: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
    <MoreHorizontal className="h-4 w-4"/>
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

const renderPages = (
    currentPage: number,
    totalPages: number,
    siblings: number
): (number | "ellipsis")[] => {
    const totalPageNoInArray = 7 + siblings
    if (totalPageNoInArray > totalPages) {
        return range(1, totalPages + 1)
    }
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages)

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 2

    if (!showLeftDots && showRightDots) {
        const leftItemsCount = 3 + 2 * siblings
        const leftRange = range(1, leftItemsCount + 1)
        return [...leftRange, "ellipsis", totalPages]
    }

    if (showLeftDots && !showRightDots) {
        const rightItemsCount = 3 + 2 * siblings
        const rightRange = range(totalPages - rightItemsCount + 1, totalPages + 1)
        return [1, "ellipsis", ...rightRange]
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex + 1)
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages]
}

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void

    // renderPrevious?: () => React.ReactNode
    // renderNext?: any
    // renderPage?: any
    // renderEllipsis?: any

    classNames?: {
        root?: string
        content?: string
        item?: string
        previous?: string
        next?: string
        page?: string
        ellipsis?: string
    }
}

const Pagination = ({
                        currentPage = 1,
                        totalPages,
                        onPageChange,
                        classNames,
                    }: PaginationProps) => {
    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const onNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <PaginationRoot className={classNames?.root}>
            <PaginationContent className={classNames?.content}>
                <PaginationItem className={classNames?.item}>
                    <PaginationPrevious onClick={onPrevious} className={classNames?.previous}/>
                </PaginationItem>

                {renderPages(currentPage, totalPages, 1).map((item, index) =>
                    item === "ellipsis" ? (
                        <PaginationItem key={index} className={classNames?.item}>
                            <PaginationEllipsis className={classNames?.ellipsis}/>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={index} className={classNames?.item}>
                            <PaginationPage
                                onClick={() => onPageChange(item)}
                                page={item}
                                isActive={currentPage === item}
                                className={classNames?.page}
                            />
                        </PaginationItem>
                    )
                )}
                <PaginationItem className={classNames?.item}>
                    <PaginationNext onClick={onNext} className={classNames?.next}/>
                </PaginationItem>
            </PaginationContent>
        </PaginationRoot>
    )
}

export {
    Pagination,
    PaginationRoot,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
}
